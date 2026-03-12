import { buildCalculationPayload } from './calculator.js';
import { ELEMENTS } from '../data/elements.js';

function calculate(options = {}) {
  const mode = options.mode === 'attack' ? 'attack' : 'defense';
  const selected = Array.isArray(options.elements) ? options.elements : [];
  return buildCalculationPayload(mode, selected);
}

window.ElementHelpAPI = {
  version: '1.0.0',
  elements: ELEMENTS,
  calculate
};
