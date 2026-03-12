import { ELEMENTS, ELEMENT_MAP, CATEGORY_RANK, OVERRIDES } from '../data/elements.js';

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

export function calculateDefense(selectedDefenders) {
  return ELEMENTS.map((attacker) => {
    const multiplier = selectedDefenders.reduce((acc, defenderId) => {
      return acc * getSingleMultiplier(attacker.id, defenderId);
    }, 1);

    return {
      element: attacker,
      multiplier: Number(multiplier.toFixed(4))
    };
  });
}

export function calculateAttack(selectedAttackers) {
  return ELEMENTS.map((defender) => {
    const multiplier = selectedAttackers.reduce((acc, attackerId) => {
      return acc * getSingleMultiplier(attackerId, defender.id);
    }, 1);

    return {
      element: defender,
      multiplier: Number(multiplier.toFixed(4))
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
  if (multiplier === 0) return mode === 'defense' ? 'imunidade' : 'sem efeito';
  if (multiplier < 1) return mode === 'defense' ? 'resistência' : 'ineficaz';
  if (multiplier === 1) return 'neutro';
  return mode === 'defense' ? 'fraqueza' : 'vantagem';
}

export function buildCalculationPayload(mode, selectedElements) {
  const normalizedMode = mode === 'attack' ? 'attack' : 'defense';
  const validSelected = selectedElements.filter((id) => ELEMENT_MAP[id]);
  const rows = normalizedMode === 'defense'
    ? calculateDefense(validSelected)
    : calculateAttack(validSelected);

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
