import { buildCalculationPayload } from './calculator.js';

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

function formatEntry(row) {
  return {
    id: row.id,
    name: row.name,
    multiplier: row.multiplier,
    text: `${row.name} ${row.multiplier}x`,
    iconPath: row.iconPath,
    color: row.color,
    category: row.category
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
    const label = row.label;

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

  return {
    mode: payload.mode,
    selected: payload.selected,
    abilities: payload.abilities,
    summary: grouped,
    summaryText: [
      ...grouped.map((group) => group.text),
      payload.abilities.length
        ? `Habilidades: ${payload.abilities.map((a) => a.name).join(', ')}`
        : 'Habilidades: nenhuma'
    ]
  };
}