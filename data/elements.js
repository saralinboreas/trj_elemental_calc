export const ELEMENTS = [
  { id: 'ElementAnnihilation', name: 'Aniquilação', category: 'Absoluta', color: '#3200B2', icon: '✦' },
  { id: 'ElementDegradation', name: 'Degradação', category: 'Absoluta', color: '#946AFF', icon: '☣' },
  { id: 'ElementPenance', name: 'Penitência', category: 'Criação', color: '#3B6DB4', icon: '⛨' },
  { id: 'ElementTempus', name: 'Tempus', category: 'Criação', color: '#8CA5FF', icon: '⌛' },
  { id: 'ElementLight', name: 'Luz', category: 'Trindade', color: '#CFCFCF', icon: '✶' },
  { id: 'ElementVoid', name: 'Vazio', category: 'Trindade', color: '#000000', icon: '◌' },
  { id: 'ElementChaos', name: 'Caos', category: 'Trindade', color: '#939393', icon: '🜃' },
  { id: 'ElementBlood', name: 'Sangue', category: 'Especial', color: '#FF0026', icon: '🩸' },
  { id: 'ElementGenesis', name: 'Gênesis', category: 'Especial', color: '#FF3251', icon: '❀' },
  { id: 'ElementRupture', name: 'Ruptura', category: 'Especial', color: '#A91D32', icon: '✂' },
  { id: 'ElementElectruid', name: 'Electruid', category: 'Especial', color: '#5aa0d8', icon: '⚙' },
  { id: 'ElementFire', name: 'Fogo', category: 'Primordial', color: '#F55D2B', icon: '🔥' },
  { id: 'ElementWater', name: 'Água', category: 'Primordial', color: '#2B97F5', icon: '💧' },
  { id: 'ElementIce', name: 'Gelo', category: 'Primordial', color: '#2BEBF5', icon: '❄' },
  { id: 'ElementEnergy', name: 'Energia', category: 'Primordial', color: '#5D2BF5', icon: '⚡' },
  { id: 'ElementTerra', name: 'Terra', category: 'Primordial', color: '#00BE03', icon: '▤' },
  { id: 'ElementAir', name: 'Ar', category: 'Primordial', color: '#5EFFAB', icon: '🜁' }
];

export const ELEMENT_MAP = Object.fromEntries(ELEMENTS.map((e) => [e.id, e]));

export const CATEGORY_RANK = {
  'Primordial': 1,
  'Trindade': 2,
  'Criação': 3,
  'Absoluta': 4,
  'Especial': 0
};

export const OVERRIDES = {
  ElementPenance: { ElementPenance: 0, ElementLight: 2, ElementVoid: 2, ElementChaos: 2, ElementAir: 1.5, ElementElectruid: 8, ElementFire: 4, ElementWater: 4, ElementEnergy: 4, ElementIce: 4, ElementTerra: 4 },
  ElementDegradation: { ElementDegradation: 0, ElementPenance: 4, ElementTempus: 2, ElementAnnihilation: 0.5, ElementElectruid: 8, ElementFire: 4, ElementWater: 4, ElementEnergy: 4, ElementIce: 4, ElementTerra: 4},
  ElementAnnihilation: { ElementAnnihilation: 8, ElementDegradation: 2, ElementPenance: 4, ElementTempus: 0.5, ElementElectruid: 8, ElementBlood: 2, ElementGenesis: 8, ElementRupture: 8, ElementFire: 4, ElementWater: 4, ElementEnergy: 4, ElementIce: 4, ElementTerra: 4},
  ElementTempus: { ElementTempus: 0, ElementPenance: 1.5, ElementAnnihilation: 2, ElementDegradation: 0.5, ElementElectruid: 8, ElementBlood: 2, ElementGenesis: 4, ElementRupture: 4 },
  ElementLight: { ElementLight: 0, ElementVoid: 2, ElementChaos: 2, ElementPenance: 0.5, ElementElectruid: 4 },
  ElementVoid: { ElementVoid: 0, ElementLight: 2, ElementChaos: 2, ElementPenance: 0.5, ElementElectruid: 4 },
  ElementChaos: { ElementChaos: 0, ElementBlood: 2, ElementVoid: 1.5, ElementLight: 1.5, ElementPenance: 0.5, ElementElectruid: 4 },
  ElementBlood: { ElementBlood: 0, ElementChaos: 2, ElementGenesis: 2, ElementRupture: 2, ElementElectruid: 2 },
  ElementGenesis: { ElementGenesis: 0, ElementRupture: 2, ElementBlood: 0.5},
  ElementRupture: { ElementRupture: 0, ElementGenesis: 2, ElementBlood: 0.5 },
  ElementElectruid: { ElementElectruid: 0, ElementWater: 0, ElementEnergy: 0, ElementTerra: 0.5, ElementFire: 2, ElementIce: 0.5, ElementAir: 1.5  },
  ElementFire: { ElementFire: 0, ElementAir: 2, ElementIce: 2, ElementTerra: 2, ElementWater: 0.5, ElementElectruid: 0.5, ElementAnnihilation: 0.5, ElementPenance: 0.5, ElementDegradation: 0.5},
  ElementWater: { ElementElectruid: 0, ElementWater: 0, ElementFire: 2, ElementTerra: 1.5, ElementEnergy: 0.5, ElementIce: 0.75, ElementAnnihilation: 0.5, ElementPenance: 0.5, ElementDegradation: 0.5 },
  ElementIce: { ElementIce: 0, ElementWater: 1.5, ElementAir: 1.5, ElementEnergy: 2.0, ElementFire: 0.5, ElementTerra: 2, ElementElectruid: 0.5, ElementAnnihilation: 0.5, ElementPenance: 0.5, ElementDegradation: 0.5 },
  ElementEnergy: { ElementElectruid: 0, ElementEnergy: 0, ElementWater: 2, ElementIce: 0.5, ElementAir: 1.5, ElementTerra: 0.5, ElementAnnihilation: 0.5, ElementPenance: 0.5, ElementDegradation: 0.5},
  ElementTerra: { ElementTerra: 0, ElementEnergy: 2, ElementElectruid: 1.5, ElementAir: 1.5, ElementFire: 0.5, ElementWater: 0.75, ElementIce: 0.5, ElementAnnihilation: 0.5, ElementPenance: 0.5, ElementDegradation: 0.5 },
  ElementAir: { ElementAir: 0, ElementTerra: 1.5, ElementFire: 1.5, ElementPenance: 1.5, ElementIce: 0.75, ElementEnergy: 0.75, ElementAnnihilation: 0.5, ElementPenance: 0.5, ElementDegradation: 0.5}
};
