import { ELEMENTS } from '../../logic/elements.js';

import { ABILITIES } from '../../logic/abilities.js';

import { buildCalculationPayload } from '../../logic/calculator.js';
import { state, setMode, toggleElement, clearSelected, toggleAbility } from './state.js';

let abilitiesCollapsed = true;

function iconImg(path, alt, fallback = '•') {
  return `
    <img src="${path}" alt="${alt}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'result-fallback',textContent:'${fallback}'}))">
  `;
}

export function renderApp() {
  renderModeButtons();
  renderAbilitiesToggle();
  renderAbilityButtons();
  renderAbilityInfo();
  renderSelectedBadges();
  renderElementGrid();
  renderResults();
}

function renderModeButtons() {
  const defenseBtn = document.querySelector('#defenseModeBtn');
  const attackBtn = document.querySelector('#attackModeBtn');
  const clearBtn = document.querySelector('#clearBtn');

  if (defenseBtn) {
    defenseBtn.classList.toggle('active', state.mode === 'defense');
    defenseBtn.setAttribute('aria-pressed', state.mode === 'defense' ? 'true' : 'false');
    defenseBtn.onclick = () => {
      setMode('defense');
      renderApp();
    };
  }

  if (attackBtn) {
    attackBtn.classList.toggle('active', state.mode === 'attack');
    attackBtn.setAttribute('aria-pressed', state.mode === 'attack' ? 'true' : 'false');
    attackBtn.onclick = () => {
      setMode('attack');
      renderApp();
    };
  }

  if (clearBtn) {
    clearBtn.onclick = () => {
      clearSelected();
      renderApp();
    };
  }
}

function renderAbilitiesToggle() {
  const toggleBtn = document.querySelector('#toggleAbilitiesBtn');
  const content = document.querySelector('#abilitiesContent');
  const panel = document.querySelector('#abilitiesPanel');

  if (!toggleBtn || !content || !panel) return;

  content.hidden = abilitiesCollapsed;
  panel.classList.toggle('is-collapsed', abilitiesCollapsed);

  toggleBtn.textContent = abilitiesCollapsed ? 'Mostrar' : 'Ocultar';
  toggleBtn.setAttribute('aria-expanded', abilitiesCollapsed ? 'false' : 'true');

  toggleBtn.onclick = () => {
    abilitiesCollapsed = !abilitiesCollapsed;
    renderApp();
  };
}

function renderAbilityButtons() {
  const wrap = document.querySelector('#abilitySelectWrap');
  if (!wrap) return;

  if (abilitiesCollapsed) {
    wrap.innerHTML = '';
    return;
  }

  const abilities = Object.values(ABILITIES).filter((ability) => ability.id !== 'None');

  wrap.innerHTML = `
    <label class="ability-label">Habilidades</label>
    <div class="ability-grid">
      ${abilities.map((ability) => {
        const active = state.abilities.includes(ability.id) ? 'active' : '';
        const iconPath = ability.element ? `icons/${ability.element}.png` : null;

        return `
          <button
            type="button"
            class="ability-card ${active}"
            data-ability-id="${ability.id}">
            <span class="ability-card-icon">
              ${iconPath
                ? iconImg(iconPath, ability.name, '•')
                : `<span class="result-fallback">•</span>`}
            </span>
            <span class="ability-card-name">${ability.name}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  wrap.querySelectorAll('[data-ability-id]').forEach((btn) => {
    btn.onclick = () => {
      toggleAbility(btn.dataset.abilityId);
      renderApp();
    };
  });
}

function renderAbilityInfo() {
  const infoText = document.querySelector('#abilityInfoText');
  const infoBox = document.querySelector('#abilityInfoBox');

  if (!infoText || !infoBox) return;

  if (abilitiesCollapsed) {
    infoBox.hidden = true;
    return;
  }

  infoBox.hidden = false;

  const selectedAbilities = (state.abilities || [])
    .map((id) => ABILITIES[id])
    .filter(Boolean);

  if (!selectedAbilities.length) {
    infoText.textContent = 'Selecione ao menos uma habilidade.';
    return;
  }

  infoText.innerHTML = selectedAbilities
    .map((ability) => {
      const description = ability.description || 'Sem descrição.';
      return `<strong>${ability.name}</strong>: ${description}`;
    })
    .join('<br><br>');
}

function renderSelectedBadges() {
  const container = document.querySelector('.selected-badges');
  if (!container) return;

  const elementBadges = state.selected.map((id) => {
    const el = ELEMENTS.find((item) => item.id === id);
    if (!el) return '';
    return `
      <div class="selected-badge" style="background:${el.color}">
        ${iconImg(`icons/${el.id}.png`, el.name, el.icon || '•')}
        <span>${el.name}</span>
      </div>
    `;
  });

  const abilityBadges = (state.abilities || []).map((id) => {
    const ability = Object.values(ABILITIES).find((item) => item.id === id);
    if (!ability) return '';
    return `
      <div class="selected-badge selected-badge-ability">
        <span>${ability.name}</span>
      </div>
    `;
  });

  container.innerHTML = [...elementBadges, ...abilityBadges].join('');
}

function renderElementGrid() {
  const grid = document.querySelector('.element-grid');
  if (!grid) return;

  grid.innerHTML = ELEMENTS.map((element) => {
    const selected = state.selected.includes(element.id) ? 'selected' : '';
    return `
      <button class="element-card ${selected}" data-element-id="${element.id}">
        <div class="element-icon" style="background:${element.color}">
          ${iconImg(`icons/${element.id}.png`, element.name, element.icon || '•')}
        </div>
        <div class="element-meta">
          <span class="element-name">${element.name}</span>
          <span class="element-cat">${element.category}</span>
        </div>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('[data-element-id]').forEach((btn) => {
    btn.onclick = () => {
      toggleElement(btn.dataset.elementId);
      renderApp();
    };
  });
}

function renderResults() {
  const container = document.querySelector('.results-container');
  if (!container) return;

  if (!state.selected.length) {
    container.innerHTML = `<div class="empty-state">Selecione 1, 2 ou 3 elementos para ver o resultado.</div>`;
    return;
  }

  const payload = buildCalculationPayload(state.mode, state.selected, state.abilities || []);

  container.innerHTML = payload.grouped.map((group) => `
    <section class="result-group">
      <h3>${group.multiplier}x — ${group.label}</h3>
      <div class="result-badges">
        ${group.elements.map((element) => `
          <div class="result-badge" style="background:${element.color}">
            <div class="result-icon">
              ${iconImg(element.iconPath, element.name, '•')}
            </div>
            <div class="result-badge-text">
              <span>${element.name}</span>
              <small>${element.category}</small>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
}