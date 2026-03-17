import { calculateElementsOrganized } from './api.js';
import { ELEMENTS } from '../../logic/elements.js';
import { ABILITIES } from '../../logic/abilities.js';

const modeInput = document.getElementById('modeInput');
const prettyInput = document.getElementById('prettyInput');
const elementsInput = document.getElementById('elementsInput');
const abilitiesInput = document.getElementById('abilitiesInput');
const endpointBox = document.getElementById('endpointBox');
const jsonOutput = document.getElementById('jsonOutput');
const statusBox = document.getElementById('statusBox');

const runBtn = document.getElementById('runBtn');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const openQueryBtn = document.getElementById('openQueryBtn');
const copyJsonBtn = document.getElementById('copyJsonBtn');
const exampleDefenseBtn = document.getElementById('exampleDefenseBtn');
const exampleAttackBtn = document.getElementById('exampleAttackBtn');
const clearFormBtn = document.getElementById('clearFormBtn');

const elementPills = document.getElementById('elementPills');
const abilityPills = document.getElementById('abilityPills');

function parseCsv(value) {
  return (value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringifyCsv(values) {
  return values.join(',');
}

function buildQueryUrl() {
  const params = new URLSearchParams();

  params.set('mode', modeInput.value === 'attack' ? 'attack' : 'defense');

  const elements = parseCsv(elementsInput.value);
  const abilities = parseCsv(abilitiesInput.value);

  if (elements.length) params.set('elements', stringifyCsv(elements));
  if (abilities.length) params.set('abilities', stringifyCsv(abilities));

  return `${location.origin}${location.pathname}?${params.toString()}`;
}

function updateEndpointBox() {
  endpointBox.textContent = buildQueryUrl();
}

function syncPillStates() {
  const selectedElements = parseCsv(elementsInput.value);
  const selectedAbilities = parseCsv(abilitiesInput.value);

  document.querySelectorAll('[data-pill-element]').forEach((btn) => {
    btn.classList.toggle('active-pill', selectedElements.includes(btn.dataset.pillElement));
  });

  document.querySelectorAll('[data-pill-ability]').forEach((btn) => {
    btn.classList.toggle('active-pill', selectedAbilities.includes(btn.dataset.pillAbility));
  });
}

function updateJson() {
  try {
    const mode = modeInput.value === 'attack' ? 'attack' : 'defense';
    const elements = parseCsv(elementsInput.value);
    const abilities = parseCsv(abilitiesInput.value);

    const payload = calculateElementsOrganized({
      mode,
      elements,
      abilities
    });

    const pretty = prettyInput.value !== 'no';
    jsonOutput.textContent = JSON.stringify(payload, null, pretty ? 2 : 0);

    statusBox.textContent = '● JSON carregado';
    statusBox.classList.remove('warn');
  } catch (error) {
    jsonOutput.textContent = JSON.stringify({
      error: true,
      message: error?.message || 'Erro desconhecido ao gerar JSON.'
    }, null, 2);

    statusBox.textContent = '● Erro ao gerar JSON';
    statusBox.classList.add('warn');
  }

  updateEndpointBox();
  syncPillStates();
}

function setFormFromQuery() {
  const params = new URLSearchParams(location.search);

  modeInput.value = params.get('mode') === 'attack' ? 'attack' : 'defense';
  elementsInput.value = params.get('elements') || '';
  abilitiesInput.value = params.get('abilities') || '';
}

function toggleCsvItem(input, value) {
  const current = parseCsv(input.value);
  const has = current.includes(value);

  const next = has
    ? current.filter((item) => item !== value)
    : [...current, value];

  input.value = stringifyCsv(next);
  updateJson();
}

function renderPills() {
  elementPills.innerHTML = ELEMENTS.map((element) => `
    <button
      type="button"
      class="pill"
      data-pill-element="${element.id}">
      ${element.name}
    </button>
  `).join('');

  abilityPills.innerHTML = Object.values(ABILITIES)
    .filter((ability) => ability.id !== 'None')
    .map((ability) => `
      <button
        type="button"
        class="pill"
        data-pill-ability="${ability.id}">
        ${ability.name}
      </button>
    `).join('');

  elementPills.querySelectorAll('[data-pill-element]').forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleCsvItem(elementsInput, btn.dataset.pillElement);
    });
  });

  abilityPills.querySelectorAll('[data-pill-ability]').forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleCsvItem(abilitiesInput, btn.dataset.pillAbility);
    });
  });

  syncPillStates();
}

async function copyText(text, button, originalText) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      button.textContent = 'Copiado!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);
    }
  } catch {
    if (button) {
      button.textContent = 'Falhou';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);
    }
  }
}

runBtn.addEventListener('click', updateJson);

copyUrlBtn.addEventListener('click', () => {
  copyText(buildQueryUrl(), copyUrlBtn, 'Copiar URL');
});

copyJsonBtn.addEventListener('click', () => {
  copyText(jsonOutput.textContent, copyJsonBtn, 'Copiar JSON');
});

openQueryBtn.addEventListener('click', () => {
  window.location.href = buildQueryUrl();
});

exampleDefenseBtn.addEventListener('click', () => {
  modeInput.value = 'defense';
  elementsInput.value = 'ElementFire,ElementWater';
  abilitiesInput.value = 'Magnetusa';
  updateJson();
});

exampleAttackBtn.addEventListener('click', () => {
  modeInput.value = 'attack';
  elementsInput.value = 'ElementRupture,ElementBlood';
  abilitiesInput.value = 'Corrosao';
  updateJson();
});

clearFormBtn.addEventListener('click', () => {
  modeInput.value = 'defense';
  prettyInput.value = 'yes';
  elementsInput.value = '';
  abilitiesInput.value = '';
  updateJson();
});

[modeInput, prettyInput, elementsInput, abilitiesInput].forEach((input) => {
  input.addEventListener('input', updateJson);
  input.addEventListener('change', updateJson);
});

setFormFromQuery();
renderPills();
updateJson();