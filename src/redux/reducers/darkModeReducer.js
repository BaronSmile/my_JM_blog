const initialDarkModeState = false;

export const darkMode = (state = initialDarkModeState, {type}) => {
  switch (type) {
    case 'TOGGLE_THEME_MODE':
      return !state;
    default:
      return state;
  }
}