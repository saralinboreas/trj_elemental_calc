export const state = {
  mode: 'defense',
  selected: [],
  abilities: []
};

export function setMode(mode) {
  state.mode = mode === 'attack' ? 'attack' : 'defense';
}

export function toggleAbility(id) {
  const has = state.abilities.includes(id);

  if (has) {
    state.abilities = state.abilities.filter((abilityId) => abilityId !== id);
  } else {
    state.abilities = [...state.abilities, id];
  }
}

export function toggleElement(elementId) {
  const has = state.selected.includes(elementId);

  if (has) {
    state.selected = state.selected.filter((id) => id !== elementId);
    return;
  }

  if (state.selected.length >= 3) {
    state.selected = [state.selected[1], elementId];
    return;
  }

  state.selected = [...state.selected, elementId];
}

export function clearSelected() {
  state.selected = [];
  state.abilities = [];
}
