<div align="center">

# ⚛️ TRJ Elemental Calculator

### Calculadora elemental avançada para sistemas de RPG

<p>
  Uma ferramenta criada para analisar <strong>fraquezas</strong>, <strong>resistências</strong>,
  <strong>imunidades</strong> e <strong>interações elementais complexas</strong>.
</p>

<p>
  <a href="https://saralinboreas.github.io/trj_elemental_calc/main/">🔮 Abrir Calculadora</a>
  •
  <a href="https://saralinboreas.github.io/trj_elemental_calc/api/">📡 Abrir API</a>
  •
  <a href="https://saralinboreas.github.io/trj_elemental_calc/">🌐 Página Inicial</a>
</p>

<p>
  <img src="https://img.shields.io/badge/HTML-estrutura-e34f26?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CSS-estilo-1572b6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JavaScript-lógica-f7df1e?style=for-the-badge&logo=javascript&logoColor=000" />
  <img src="https://img.shields.io/badge/API-JSON-111827?style=for-the-badge" />
</p>

</div>

---

## 🌌 Sobre o projeto

O **TRJ Elemental Calculator** é uma calculadora feita para sistemas de RPG com múltiplos elementos, interações especiais e lógica hierárquica.

Diferente de calculadoras comuns, ela considera:

- múltiplos elementos ao mesmo tempo
- relações elementais complexas
- hierarquia elemental
- modificadores especiais
- habilidades que alteram o cálculo final
- limite máximo de multiplicadores
- retorno em JSON para integração com bots e ferramentas externas

Tudo isso em uma interface rápida, prática e pensada para uso real durante sessões de RPG.

---

## ✨ Recursos

- ⚔️ **Modo Ataque**
- 🛡️ **Modo Defesa**
- 🧬 **Hierarquia Elemental**
- 🧠 **Sistema de Habilidades**
- 📊 **Multiplicador com limite**
- 📡 **API pública**
- 🎮 **Uso rápido em sessão**

---

## 🎮 Exemplo de cálculo

**Modo:** Defesa  
**Elementos selecionados:** `Fogo + Terra`

### Resultado

| Categoria | Elementos |
|---|---|
| **Super Efetivo** | `Vazio — 4x` · `Caos — 2x` |
| **Efetivo** | `Energia — 2x` · `Gelo — 2x` |
| **Neutro** | `Ar — 1x` |
| **Resistente** | `Água — 0.5x` |
| **Imune** | `Sangue` |

---

## ⚔️ Modos de cálculo

### 🛡 Defesa
Mostra **quanto dano o personagem recebe** de cada elemento.

- Elementos selecionados = defesa
- Elementos listados = atacantes

### ⚔️ Ataque
Mostra **quanto dano o personagem causa** contra cada elemento.

- Elementos selecionados = ataque
- Elementos listados = defensores

---

## 🧬 Hierarquia Elemental

Os elementos possuem **categorias com níveis hierárquicos**.

```text
Criação ↓ Trindade ↓ Primordiais
```

Cada diferença de nível gera o multiplicador:

2^(diferença de nível)

Exemplo

Criação → Primordial = 4x


---

🧠 Sistema de habilidades

As habilidades podem modificar o cálculo elemental final.

Habilidade	Efeito

Vazio Absoluto	Luz e Caos nunca causam dano super efetivo
Levitar	Imune a Terra
Eclipse das Nove Luas	Sangue sempre causa 2x
Omnipresença	Usuário possui todos os elementos


> As habilidades são aplicadas após o cálculo elemental base.




---

📊 Limite de multiplicador

Para evitar resultados absurdos:

Multiplicador máximo = 8x
Multiplicador mínimo = 0x

Isso impede situações como:

2 × 2 × 2 × 2 × 2 = 32x


---

📡 API

A aplicação também pode retornar resultados em JSON, permitindo integração com bots, apps e ferramentas externas.

Exemplo de request

/api?mode=defense&elements=ElementFire,ElementWater

Exemplo de resposta

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


---

🛠 Tecnologias

HTML

CSS

JavaScript


Sem dependências externas.


---

🌍 Universo

Este projeto faz parte do universo de:

The Relic Journey Project


---

🚪 Acesso rápido

Main: https://saralinboreas.github.io/trj_elemental_calc/main/

API: https://saralinboreas.github.io/trj_elemental_calc/api/

Hub: https://saralinboreas.github.io/trj_elemental_calc/



---

<div align="center">
  <sub>Feito para interações elementais complexas, absurdas e divertidas.</sub>
</div>
