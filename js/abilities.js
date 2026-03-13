import { ELEMENTS } from '../data/elements.js';

export const ABILITIES = {

  None: {
    id: 'None',
    name: 'Nenhuma',
    apply(multiplier) {
      return multiplier;
    }
  },

  MarcaEspiralia: {
    id: 'MarcaEspiralia',
    name: 'Marca Espiral',
    element: 'ElementAnnihilation',

    apply(multiplier, context) {
      const targetId = context.targetId;

      if (targetId === 'ElementAnnihilation') {
        return multiplier * 2;
      }

      return multiplier;
    }
  },

  FragEncantriz: {
  id: 'FragEncantriz',
  name: 'Fragmentos da Encantriz',
  element: 'ElementFire',

  apply(multiplier, context) {

    const target = context.targetId;

    // Água sempre super efetivo
    if (target === 'ElementWater') {

      if (multiplier < 2) {
        return 2;
      }

      return multiplier;
    }

    return multiplier;
  }
},
  
  Gula: {
    id: 'Gula',
    name: 'Gula Hidromórfica',
    element: 'ElementWater',

    apply(multiplier, context) {
      const targetId = context.targetId;

      if (targetId === 'ElementWater') {
        return 0;
      }

      return multiplier;
    }
  },

  VazioAbsoluto: {
    id: 'VazioAbsoluto',
    name: 'Vazio Absoluto',
    element: 'ElementVoid',

    apply(multiplier, context) {

      const target = context.targetId;

      // Imune a vazio
      if (target === 'ElementVoid') {
        return 0;
      }

      // Luz e caos não podem ser super efetivos
      if (target === 'ElementLight' || target === 'ElementChaos') {

        if (multiplier > 1) {
          return 1;
        }

        return multiplier;
      }

      return multiplier;
    }
  },

  Levitate: {
    id: 'Levitate',
    name: 'Levitar',
    element: 'ElementAir',

    apply(multiplier, context) {

      const target = context.targetId;

      if (target === 'ElementTerra') {
        return 0;
      }

      if (target === 'ElementFire' || target === 'ElementWater') {
        return multiplier * 0.5;
      }

      if (target === 'ElementEnergy') {
        return multiplier * 2;
      }

      return multiplier;
    }
  },

  EclipseNineMoons: {
    id: 'EclipseNineMoons',
    name: 'Eclipse das Nove Luas',
    element: 'ElementBlood',

    apply(multiplier, context) {

      const target = context.targetId;

      if (target === 'ElementBlood') {

        // remove imunidade
        if (multiplier === 0) {
          return 2;
        }

        return 2;
      }

      return multiplier;
    }
  },

  Omnipresenca: {
    id: 'Omnipresenca',
    name: 'Omnipresença',
    element: 'ElementDegradation',

    // altera a seleção de elementos antes do cálculo
    modifySelection(selectedElements, context) {
      return ELEMENTS.map((element) => element.id);
    },

    apply(multiplier) {
      return multiplier;
    }
  }

};
