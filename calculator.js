import { ELEMENTS, ELEMENT_MAP, CATEGORY_RANK, OVERRIDES } from '../data/elements.js';
import { ABILITIES } from './abilities.js';

const MAX_MULTIPLIER = 8;
const MIN_MULTIPLIER = 0;

function clampMultiplier(value) {
  return Math.max(MIN_MULTIPLIER, Math.min(value, MAX_MULTIPLIER));
}

function roundMultiplier(value) {
  return Number(value.toFixed(4));
}

function applySelectionModifiers(selectedElements, abilityIds = [], context = {}) {
  let result = [...selectedElements];

  for (const id of abilityIds) {
    const ability = ABILITIES[id];
    if (!ability || typeof ability.modifySelection !== 'function') continue;

    const modified = ability.modifySelection(result, context);
    if (Array.isArray(modified)) {
      result = modified.filter((elementId) => ELEMENT_MAP[elementId]);
    }
  }

  return [...new Set(result)];
}

function applyAbilities(multiplier, abilityIds = [], context = {}) {
  let result = multiplier;

  for (const id of abilityIds) {
    const ability = ABILITIES[id];
    if (!ability || typeof ability.apply !== 'function') continue;

    result = ability.apply(result, context);
    result = clampMultiplier(result);
  }

  return clampMultiplier(result);
}

function getHierarchyMultiplier(attackerId, defenderId) {
  const attacker = ELEMENT_MAP[attackerId];
  const defender = ELEMENT_MAP[defenderId];
  if (!attacker || !defender) return 1;

  const ar = CATEGORY_RANK[attacker.category] ?? 0;
  const dr = CATEGORY_RANK[defender.category] ?? 0;

  if (ar === 0 || dr === 0 || ar <= dr) return 1;

  const diff = ar - dr;
  return 2 ** diff;
}

export function getSingleMultiplier(attackerId, defenderId) {
  if (OVERRIDES[attackerId]?.[defenderId] !== undefined) {
    return OVERRIDES[attackerId][defenderId];
  }

  if (attackerId === defenderId) return 0;

  return getHierarchyMultiplier(attackerId, defenderId);
}

export function calculateDefense(selectedDefenders, abilityIds = []) {
  return ELEMENTS.map((attacker) => {
    const resolvedDefenders = applySelectionModifiers(selectedDefenders, abilityIds, {
      mode: 'defense',
      attackerId: attacker.id,
      selectedElements: selectedDefenders
    });

    const baseMultiplier = resolvedDefenders.reduce((acc, defenderId) => {
      return acc * getSingleMultiplier(attacker.id, defenderId);
    }, 1);

    const finalMultiplier = applyAbilities(baseMultiplier, abilityIds, {
      mode: 'defense',
      attackerId: attacker.id,
      selectedElements: resolvedDefenders,
      originalSelectedElements: selectedDefenders,
      targetId: attacker.id
    });

    return {
      element: attacker,
      multiplier: roundMultiplier(finalMultiplier)
    };
  });
}

export function calculateAttack(selectedAttackers, abilityIds = []) {
  return ELEMENTS.map((defender) => {
    const resolvedAttackers = applySelectionModifiers(selectedAttackers, abilityIds, {
      mode: 'attack',
      defenderId: defender.id,
      selectedElements: selectedAttackers
    });

    const baseMultiplier = resolvedAttackers.reduce((acc, attackerId) => {
      return acc * getSingleMultiplier(attackerId, defender.id);
    }, 1);

    const finalMultiplier = applyAbilities(baseMultiplier, abilityIds, {
      mode: 'attack',
      defenderId: defender.id,
      selectedElements: resolvedAttackers,
      originalSelectedElements: selectedAttackers,
      targetId: defender.id
    });

    return {
      element: defender,
      multiplier: roundMultiplier(finalMultiplier)
    };
  });
}

export function groupResults(results) {
  const buckets = new Map();

  for (const row of results) {
    const key = row.multiplier;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(row.element);
  }

  return [...buckets.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([multiplier, elements]) => ({ multiplier, elements }));
}

export function getMultiplierLabel(multiplier, mode = 'defense') {
  if (multiplier === 0) {
    return mode === 'defense' ? 'Imunidade' : 'Imune';
  }

  if (multiplier < 0.5) {
    return mode === 'defense' ? 'Resistência extrema' : 'Muito ineficaz';
  }

  if (multiplier < 1) {
    return mode === 'defense' ? 'Resistente' : 'Ineficaz';
  }

  if (multiplier === 1) {
    return 'Neutro';
  }

  if (multiplier < 2) {
    return 'Efetivo';
  }

  if (multiplier < 4) {
    return 'Super efetivo';
  }

  return 'Extremamente efetivo';
}

export function buildCalculationPayload(mode, selectedElements, abilityIds = []) {
  const normalizedMode = mode === 'attack' ? 'attack' : 'defense';
  const validSelected = selectedElements.filter((id) => ELEMENT_MAP[id]);
  const validAbilities = abilityIds.filter((id) => ABILITIES[id]);

  const rows = normalizedMode === 'defense'
    ? calculateDefense(validSelected, validAbilities)
    : calculateAttack(validSelected, validAbilities);

  const grouped = groupResults(rows).map((group) => ({
    multiplier: group.multiplier,
    label: getMultiplierLabel(group.multiplier, normalizedMode),
    elements: group.elements.map((element) => ({
      id: element.id,
      name: element.name,
      category: element.category,
      color: element.color,
      iconPath: `icons/${element.id}.png`
    }))
  }));

  return {
    mode: normalizedMode,
    abilities: validAbilities.map((id) => ({
      id: ABILITIES[id].id,
      name: ABILITIES[id].name
    })),
    selected: validSelected.map((id) => ({
      id,
      name: ELEMENT_MAP[id].name,
      category: ELEMENT_MAP[id].category,
      color: ELEMENT_MAP[id].color,
      iconPath: `icons/${id}.png`
    })),
    results: rows.map((row) => ({
      id: row.element.id,
      name: row.element.name,
      category: row.element.category,
      color: row.element.color,
      iconPath: `icons/${row.element.id}.png`,
      multiplier: row.multiplier,
      label: getMultiplierLabel(row.multiplier, normalizedMode)
    })),
    grouped
  };
}