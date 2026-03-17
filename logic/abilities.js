import { ELEMENTS } from './elements.js';

export const ABILITIES = {

  None: {
    id: 'None',
    name: 'Nenhuma',
    apply(multiplier) {
      return multiplier;
    }
  },
  
  PrismaDeGuerra: {
  id: 'PrismaDeGuerra',
  name: 'Prisma de Guerra',
  element: 'ElementFire',

  description: 'Remove todas as fraquezas de Fogo, tornando-as neutras. Água sempre causa dano dobrado.',

  apply(multiplier, context) {
    // Só funciona na defesa
    if (context.mode !== 'defense') {
      return multiplier;
    }

    const target = context.targetId;

    // Água sempre 2x
    if (target === 'ElementWater') {
      return 2;
    }

    // Remove fraquezas (qualquer coisa > 1 vira 1)
    if (multiplier > 1) {
      return 1;
    }

    return multiplier;
  }
},
  
  FragEncantriz: {
  id: 'FragEncantriz',
  name: 'Fragmentos da Encantriz',
  element: 'ElementFire',
  description: 'Causa dano dobrado em Água com Fogo, mas tambem toma dano dobrado.',
  apply(multiplier, context) {

    const target = context.targetId;

    // Água sempre super efetivo
    if (target === 'ElementWater') {

      if (multiplier < 1) {
        return 2;
      }

      return multiplier;
    }

    return multiplier;
  }
},
  
  CinzasDeMyamura: {
  id: 'CinzasDeMyamura',
  name: 'Cinzas de Myamura',
  element: 'ElementFire',

  description: 'Cria um enorme terreno arido e ensolarado no campo de batalha mesmo de noite, alvos sofre dano 4x de Fogo. Ataques de Água e Gelo evaporam.',

  apply(multiplier, context) {
    const target = context.targetId;

    // ⚔ MODO ATAQUE → fraqueza absurda a fogo
    if (context.mode === 'attack') {
      if (target === 'ElementFire') {
        return multiplier * 4;
      }
    }

    // 🛡 MODO DEFESA → imunidade a água
    if (context.mode === 'defense') {
      if (target === 'ElementWater') {
        return 0;
      }
      if (target === 'ElementIce') {
        return 0;
      }
    }

    return multiplier;
  }
},
  
  EnxameTingido: {
  id: 'EnxameTingido',
  name: 'Enxame Tingido',
  element: 'ElementTerra',

  description: 'Ataques não efetivos do usuario passam a causar dano efetivo.',

  apply(multiplier, context) {
    if (context.mode !== 'attack') {
      return multiplier;
    }

    // Se NÃO for efetivo (menor que 2x), vira 2x
    if (multiplier < 2) {
      return 2;
    }

    return multiplier;
  }
},
  
  CampoDissolucao: {
  id: 'CampoDissolucao',
  name: 'Campo de Dissolução',
  element: 'ElementTerra',
  description: 'Reduz o dano causado por Energia pela metade.',
  apply(multiplier, context) {

    const target = context.targetId;

    // Energia causa metade do dano
    if (target === 'ElementEnergy') {
      return multiplier * 0.5;
    }

    return multiplier;
  }
},

  AuroraBoreal: {
  id: 'AuroraBoreal',
  name: 'Aurora Boreal',
  element: 'ElementWater',

  description: 'Cria uma enorme e delicade Aurora Boreal no campo de batalha, Alvos sofrem dano dobrado de Água e Gelo. ataques de Fogo evaporam.',

  apply(multiplier, context) {
    const target = context.targetId;

    // ⚔ MODO ATAQUE → fraqueza a água e gelo
    if (context.mode === 'attack') {
      if (target === 'ElementFire') {
        return multiplier * 2;
      }
    }

    // 🛡 MODO DEFESA → imunidade a fogo
    if (context.mode === 'defense') {
      if (target === 'ElementFire') {
        return 0;
      }
    }

    return multiplier;
  }
},
  
  Gula: {
    id: 'Gula',
    name: 'Gula Hidromórfica',
    element: 'ElementWater',
    description: 'Absorve e redireciona ataques de Água, se tornando imune.',
    apply(multiplier, context) {
      const targetId = context.targetId;

      if (targetId === 'ElementWater') {
        return 0;
      }

      return multiplier;
    }
  },

  Magnetusa: {
  id: 'Magnetusa',
  name: 'Magnetusa',
  element: 'ElementEnergy',

  description: 'Transforma todos os ataques do alvo em energia, concede imunidade ao usuario.',

  apply(multiplier, context) {
    if (context.mode !== 'defense') {
      return multiplier;
    }

    // Se o ataque for de Energia → imunidade
    if (context.attackingElement === 'Energy') {
      return 0;
    }

    return multiplier;
  }
},
  
  Levitate: {
    id: 'Levitate',
    name: 'Levitar',
    element: 'ElementAir',
    description: 'Flutua no ar, se tornando imune a Terra, e reduzindo dano de Água e Fogo, mas se tornando alvo de Energia.',
    apply(multiplier, context) {

      const target = context.targetId;

      if (target === 'ElementTerra') {
        return 0;
      }

      if (target === 'ElementFire' || target === 'ElementWater') {
        return multiplier * 0.5;
      }

      if (target === 'ElementEnergy') {
        if (multiplier == 1.5) {
        return 2;
      }
        return multiplier * 2;
      }

      return multiplier;
    }
  },

  SoberaniaAerea: {
  id: 'SoberaniaAerea',
  name: 'Soberania Aérea',
  element: 'ElementAir',

  description: 'Na defesa, reduz o dano recebido de Energia, Terra e Electruid pela metade. No ataque, aumenta o dano causado contra Penitência em 0.5x.',

  apply(multiplier, context) {
    const target = context.targetId;

    // 🛡 DEFESA → resistência
    if (context.mode === 'defense') {
      if (
        target === 'ElementEnergy' ||
        target === 'ElementTerra' ||
        target === 'ElementElectruid'
      ) {
        return multiplier * 0.5;
      }
    }

    // ⚔ ATAQUE → bônus contra Penitência
    if (context.mode === 'attack') {
      const selected = context.selectedElements || [];

      if (
        selected.includes('ElementAir') &&
        target === 'ElementPenance'
      ) {
        return multiplier + 0.5;
      }
    }

    return multiplier;
  }
},
  
  VazioAbsoluto: {
    id: 'VazioAbsoluto',
    name: 'Vazio Absoluto',
    element: 'ElementVoid',
    description: 'Imune a vazio, e neutro a Luz e Caos.',
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
  
  EclipseNineMoons: {
    id: 'EclipseNineMoons',
    name: 'Eclipse das Nove Luas',
    element: 'ElementBlood',
    description: 'Causa dano dobrado em todos os elementos, perde imunidade.',
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
  
GrandeurTerrifiant: {
  id: 'GrandeurTerrifiant',
  name: 'Grandeur Terrifiant',
  element: 'ElementRupture',

  description: 'Uma presença predatória distorce a energia interna, reduzindo fraquezas de Ruptura e Aumentando sua força.',

  apply(multiplier, context) {
    const target = context.targetId;

    // Defesa
    if (context.mode === 'defense') {
      if (
        target === 'ElementTerra' ||
        target === 'ElementEnergy' ||
        target === 'ElementGenesis' ||
        target === 'ElementElectruid'
      ) {
        if (multiplier > 1) {
          return 1;
        }
      }
    }

    // Ataque
    if (context.mode === 'attack') {
      const selectedAttackers = context.selectedElements || [];

      if (
        selectedAttackers.includes('ElementRupture') &&
        (
          target === 'ElementTerra' ||
          target === 'ElementEnergy' ||
          target === 'ElementElectruid'
        )
      ) {
        return 1;
      }
    }

    return multiplier;
  }
},
  
  AbsolvicaoSagrada: {
  id: 'AbsolvicaoSagrada',
  name: 'Absolvição Sagrada',
  element: 'ElementPenance',

  description: 'Na defesa, torna o usuário imune a todo dano que não seja super efetivo.',

  apply(multiplier, context) {
    if (context.mode !== 'defense') {
      return multiplier;
    }

    // Tudo abaixo de 2x vira imunidade
    if (multiplier < 2) {
      return 0;
    }

    return multiplier;
  }
},
  
  MarcaEspiralia: {
  id: 'MarcaEspiralia',
  name: 'Marca Espiral',
  element: 'ElementAnnihilation',
  description: 'Reduz severamente o dano recebido de todos os elementos, menos Aniquilação.',
  apply(multiplier, context) {

    const targetId = context.targetId;

    // Aniquilação causa mais dano
    if (targetId === 'ElementAnnihilation') {
      return 8;
    }

    // Todos os outros causam metade do dano
    return multiplier * 0.5;
  }
},

  Corrosao: {
  id: 'Corrosao',
  name: 'Corrosão Espectral',
  element: 'ElementAnnihilation',

  description: 'Como atacante, remove todas as imunidades do alvo.',

  apply(multiplier, context) {
    // Só funciona no ataque
    if (context.mode !== 'attack') {
      return multiplier;
    }

    // Remove imunidade (0 → 1)
    if (multiplier === 0) {
      return 1;
    }

    return multiplier;
  }
},
  
  Omnipresenca: {
    id: 'Omnipresenca',
    name: 'Omnipresença',
    element: 'ElementDegradation',
    description: 'Se torna imune a todos os elementos.',
    // altera a seleção de elementos antes do cálculo
    
    modifySelection(selectedElements, context) {
      return ELEMENTS.map((element) => element.id);
    },

    apply(multiplier) {
      return multiplier;
    
    }
  }

};
