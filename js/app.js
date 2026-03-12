import { calculateAttack, calculateDefense, groupResults } from './calculator.js';
import { clearSelection, setMode, state, toggleSelection } from './state.js';
import { renderElementGrid, renderResults, renderSelected, updateLabels } from './ui.js';

const grid = document.getElementById('elementGrid');
const selectedBadges = document.getElementById('selectedBadges');
const resultsContainer = document.getElementById('resultsContainer');
const clearBtn = document.getElementById('clearBtn');
const defenseBtn = document.getElementById('defenseModeBtn');
const attackBtn = document.getElementById('attackModeBtn');

function rerender() {
  updateLabels();
  renderElementGrid(grid, (elementId) => {
    toggleSelection(elementId, 2);
    rerender();
  });
  renderSelected(selectedBadges);

  if (!state.selected.length) {
    renderResults(resultsContainer, [], state.mode);
    return;
  }

  const rows = state.mode === 'defense'
    ? calculateDefense(state.selected)
    : calculateAttack(state.selected);

  renderResults(resultsContainer, groupResults(rows), state.mode);
}

clearBtn.addEventListener('click', () => {
  clearSelection();
  rerender();
});

defenseBtn.addEventListener('click', () => {
  setMode('defense');
  rerender();
});

attackBtn.addEventListener('click', () => {
  setMode('attack');
  rerender();
});

rerender();

import { ELEMENTS } from "../data/elements.js";

function getRandomElement() {
  return ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
}

window.addEventListener("DOMContentLoaded", () => {

  const brandIcon = document.querySelector(".brand-icon");
  const header = document.querySelector(".topbar");

  if (!brandIcon) return;

  const randomElement = getRandomElement();

  brandIcon.innerHTML = `
    <img src="icons/${randomElement.id}.png" alt="${randomElement.name}">
  `;

  if (header) {
    document.documentElement.style.setProperty('--topbar-color-1', randomElement.color);
    document.documentElement.style.setProperty('--topbar-color-2', "#111");
  }
});