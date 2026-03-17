import { renderApp } from './ui.js';
import { ELEMENTS } from '../../logic/elements.js';

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');

if (menu && menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
}

function getRandomElement() {
  return ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
}

function startTitleGradientCycle() {
  const validElements = ELEMENTS.filter((element) => element.color);

  if (validElements.length < 3) return;

  let index = 0;

  function updateTitleGradient() {
    const first = validElements[index % validElements.length];
    const second = validElements[(index + 1) % validElements.length];
    const third = validElements[(index + 2) % validElements.length];

    document.documentElement.style.setProperty('--title-color-1', first.color);
    document.documentElement.style.setProperty('--title-color-2', second.color);
    document.documentElement.style.setProperty('--title-color-3', third.color);

    index = (index + 1) % validElements.length;
  }

  updateTitleGradient();
  setInterval(updateTitleGradient, 1600);
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

  startTitleGradientCycle();
  renderApp();
});
