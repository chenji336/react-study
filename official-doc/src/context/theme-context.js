import React from 'react';

export const themes = {
    light: {
      foreground: '#ffffff',
      background: '#222222',
    },
    dark: {
      foreground: '#000000',
      background: '#eeeeee',
    },
  };

//   传递的参数使一个对象
export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}
});