import { renderApp } from './ui.js';
import { ELEMENTS } from '../data/elements.js';

function getRandomElement() {
  return ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
}

window.addEventListener('DOMContentLoaded', () => {
  const brandIcon = document.querySelector('.brand-icon');
  const randomElement = getRandomElement();

  if (brandIcon) {
    brandIcon.innerHTML = `
      <img src="icons/${randomElement.id}.png" alt="${randomElement.name}">
    `;
  }

  document.documentElement.style.setProperty('--topbar-color-1', randomElement.color);
  document.documentElement.style.setProperty('--topbar-color-2', '#111111');

  renderApp();
});