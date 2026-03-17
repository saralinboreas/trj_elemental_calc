import { buildCalculationPayload } from '../../logic/calculator.js';

function labelOrder(label) {
  const order = {
    'Extremamente efetivo': 0,
    'Super efetivo': 1,
    'Efetivo': 2,
    'Neutro': 3,
    'Resistente': 4,
    'Resistência extrema': 5,
    'Imunidade': 6,
    'Imune': 6,
    'Muito ineficaz': 7,
    'Ineficaz': 8,
    'sem efeito': 9
  };

  return order[label] ?? 99;
}

function normalizeLabel(label) {
  if (label === 'Imune') return 'Imunidade';
  if (label === 'sem efeito') return 'Imunidade';
  if (label === 'Muito ineficaz') return 'Resistência extrema';
  if (label === 'Ineficaz') return 'Resistente';
  return label;
}

function formatEntry(row) {
  if (row.multiplier === 0) {
    return {
      id: row.id,
      name: row.name,
      multiplier: row.multiplier,
      category: row.category,
      color: row.color,
      iconPath: row.iconPath,
      text: row.name
    };
  }

  return {
    id: row.id,
    name: row.name,
    multiplier: row.multiplier,
    category: row.category,
    color: row.color,
    iconPath: row.iconPath,
    text: `${row.name} ${row.multiplier}x`
  };
}

export function calculateElementsOrganized({
  mode = 'defense',
  elements = [],
  abilities = []
} = {}) {
  const payload = buildCalculationPayload(mode, elements, abilities);

  const groupedMap = new Map();

  for (const row of payload.results) {
    const label = normalizeLabel(row.label);

    if (!groupedMap.has(label)) {
      groupedMap.set(label, []);
    }

    groupedMap.get(label).push(formatEntry(row));
  }

  const grouped = [...groupedMap.entries()]
    .sort((a, b) => labelOrder(a[0]) - labelOrder(b[0]))
    .map(([label, values]) => ({
      label,
      items: values,
      text: `${label}: ${values.map((v) => v.text).join(', ')}`
    }));

  const selectedText = payload.selected.length
    ? payload.selected.map((item) => item.name).join(', ')
    : 'nenhum';

  const abilitiesText = payload.abilities.length
    ? payload.abilities.map((item) => item.name).join(', ')
    : 'nenhuma';

  const resultsObject = {};

  for (const group of grouped) {
    resultsObject[group.label] = group.items.map((item) => item.text);
  }

  const lines = [
    `Modo: ${payload.mode}`,
    `Elementos: ${selectedText}`,
    `Habilidades: ${abilitiesText}`,
    ...grouped.map((group) => group.text)
  ];

  return {
    mode: payload.mode,
    modeText: `Modo: ${payload.mode}`,

    selected: payload.selected.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      color: item.color,
      iconPath: item.iconPath
    })),
    selectedNames: payload.selected.map((item) => item.name),
    selectedText,

    abilities: payload.abilities.map((item) => ({
      id: item.id,
      name: item.name
    })),
    abilityNames: payload.abilities.map((item) => item.name),
    abilitiesText,

    grouped,
    results: resultsObject,

    lines,
    text: lines.join('\n')
  };
}
