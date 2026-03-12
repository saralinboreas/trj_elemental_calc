export const state = {
  mode: 'defense',
  selected: []
};

export function toggleSelection(elementId, max = 2) {
  const index = state.selected.indexOf(elementId);
  if (index >= 0) {
    state.selected.splice(index, 1);
    return;
  }
  if (state.selected.length >= max) {
    state.selected.shift();
  }
  state.selected.push(elementId);
}

export function clearSelection() {
  state.selected = [];
}

export function setMode(mode) {
  state.mode = mode;
  clearSelection();
}
