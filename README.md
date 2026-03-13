# ⚛️ Calculadora Elemental
<p align="center">

**Calculadora Elemental Avançada para Sistemas de RPG**
Uma ferramenta criada para analisar **fraquezas, resistências, imunidades e interações elementais complexas**.
</p>

## 🌌 Sobre o Projeto

**TRJ Calculator** é uma calculadora feita para sistemas de RPG que utilizam múltiplos elementos e hierarquias mágicas.

Diferente de calculadoras tradicionais, ela considera:

- múltiplos elementos simultâneos
- hierarquia elemental
- modificadores especiais
- habilidades que alteram o cálculo
- limite máximo de multiplicadores
- API pública para bots

Tudo isso em uma interface simples e rápida para uso durante sessões de RPG.

## 🎮 Demonstração

Modo: Defesa
Elementos selecionados: Fogo + Terra

Resultado:

Super Efetivo: Vazio — 4x
Caos — 2x

Efetivo: Energia — 2x
Gelo — 2x

Neutro: Ar — 1x

Resistente: Água — 0.5x

Imune: Sangue

## ⚔️ Modos de Cálculo

### 🛡 Defesa

Mostra **quanto dano o personagem recebe** de cada elemento.

Elementos selecionados = defesa
Elementos listados = atacantes

### ⚔️ Ataque

Mostra **quanto dano o personagem causa** contra cada elemento.

Elementos selecionados = ataque
Elementos listados = defensores

## 🧬 Hierarquia Elemental

Os elementos possuem **categorias com níveis hierárquicos**.

Criação ↓ Trindade ↓ Primordiais

Cada diferença de nível gera multiplicador:

2^(diferença de nível)

Exemplo:

Criação → Primordial = 4x

## 🧠 Sistema de Habilidades

Habilidades podem modificar o cálculo final.

Exemplos:

| Habilidade | Efeito |
|---|---|
Vazio Absoluto | Luz e Caos nunca causam dano super efetivo |
Levitar | Imune a Terra |
Eclipse das Nove Luas | Sangue sempre causa 2x |
Omnipresença | Usuário possui todos os elementos |

As habilidades são aplicadas **após o cálculo elemental base.**

## 📊 Limite de Multiplicador

Para evitar resultados absurdos:

Multiplicador máximo = 8x
Multiplicador mínimo = 0x

Isso evita casos como:

2 × 2 × 2 × 2 × 2 = 32x

## 📡 API

O sistema pode retornar resultados em **JSON**, permitindo integração com bots ou outras ferramentas.

Exemplo de request:

/api?mode=defense&elements=ElementFire,ElementWater

Resposta:

```json
{
 "Super Efetivo": {
   "ElementChaos": "4x"
 },
 "Efetivo": {
   "ElementFire": "2x"
 },
 "Neutro": {
   "ElementTerra": "1x"
 },
 "Resistente": {
   "ElementIce": "0.5x"
 },
 "Imunidade": [
   "ElementBlood"
 ]
}
```

🔧 Tecnologias

Projeto desenvolvido com:
HTML
CSS
JavaScript

Sem dependências externas.

🌍 Universo

Este projeto faz parte do universo de:

The Relic Journey Project
