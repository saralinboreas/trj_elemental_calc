import { ELEMENTS } from '../data/elements.js';
import { state } from './state.js';

function formatMultiplier(multiplier) {
  return String(multiplier).replace('.', ',') + 'x';
}

function getResultTitle(multiplier, mode) {
  if (mode === 'defense') return `Recebe ${formatMultiplier(multiplier)} de`;
  return `Causa ${formatMultiplier(multiplier)} em`;
}

function getIconSpan(element, size = 'element') {
  const wrapperClass = size === 'result' ? 'result-icon' : 'element-icon';
  const fallbackClass = size === 'result' ? 'result-fallback' : 'element-fallback';
  const short = element.name.slice(0, 2).toUpperCase();
  return `
    <span class="${wrapperClass}" style="background:${element.color}">
      <img src="icons/${element.id}.png" alt="${element.name}" onerror="this.remove()">
      <span class="${fallbackClass}">${short}</span>
    </span>
  `;
}

export function renderElementGrid(container, onSelect) {
  container.innerHTML = '';
  for (const element of ELEMENTS) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'element-card';
    if (state.selected.includes(element.id)) button.classList.add('selected');
    button.innerHTML = `
      ${getIconSpan(element, 'element')}
      <span class="element-meta">
        <span class="element-name">${element.name}</span>
        <span class="element-cat">${element.category}</span>
      </span>
    `;
    button.addEventListener('click', () => onSelect(element.id));
    container.appendChild(button);
  }
}

export function renderSelected(container) {
  container.innerHTML = '';
  for (const element of ELEMENTS.filter((e) => state.selected.includes(e.id))) {
    const tag = document.createElement('span');
    tag.className = 'selected-badge';
    tag.style.background = element.color;
    tag.innerHTML = `
      <img src="icons/${element.id}.png" alt="${element.name}" onerror="this.remove()">
      <span>${element.name}</span>
    `;
    container.appendChild(tag);
  }
}

export function renderResults(container, grouped, mode) {
  container.innerHTML = '';
  if (!grouped.length) {
    container.innerHTML = `<div class="empty-state">Selecione 1 ou 2 elementos para ver fraquezas, resistências, neutros e imunidades.</div>`;
    return;
  }

  grouped.forEach((group) => {
    const section = document.createElement('section');
    section.className = 'result-group';

    const title = document.createElement('h3');
    title.textContent = getResultTitle(group.multiplier, mode);
    section.appendChild(title);

    const wrap = document.createElement('div');
    wrap.className = 'result-badges';

    group.elements.forEach((element) => {
      const badge = document.createElement('div');
      badge.className = 'result-badge';
      badge.style.background = element.color;
      badge.innerHTML = `
        ${getIconSpan(element, 'result')}
        <span class="result-badge-text">
          <span>${element.name}</span>
          <small>${element.category}</small>
        </span>
      `;
      wrap.appendChild(badge);
    });

    section.appendChild(wrap);
    container.appendChild(section);
  });
}

export function updateLabels() {
  const selectorTitle = document.getElementById('selectorTitle');
  const resultsTitle = document.getElementById('resultsTitle');
  const defenseBtn = document.getElementById('defenseModeBtn');
  const attackBtn = document.getElementById('attackModeBtn');

  if (state.mode === 'defense') {
    selectorTitle.textContent = 'Escolha até 2 elementos de defesa';
    resultsTitle.textContent = 'Dano recebido por tipo atacante';
    defenseBtn.classList.add('active');
    attackBtn.classList.remove('active');
    defenseBtn.setAttribute('aria-pressed', 'true');
    attackBtn.setAttribute('aria-pressed', 'false');
  } else {
    selectorTitle.textContent = 'Escolha até 2 elementos de ataque';
    resultsTitle.textContent = 'Dano causado contra cada defensor';
    attackBtn.classList.add('active');
    defenseBtn.classList.remove('active');
    attackBtn.setAttribute('aria-pressed', 'true');
    defenseBtn.setAttribute('aria-pressed', 'false');
  }
}
