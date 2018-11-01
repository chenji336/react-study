import React, { Component } from 'react';
import './App.css';
import { ThemeContext, themes } from './context/theme-context';
import ThemeTogglerButton from './context/theme-toggler-button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme // 函数使放在state中带过去的
    };
  }

  toggleTheme = () => {
    this.setState(preState => ({
      theme: preState.theme === themes.light ? themes.dark : themes.light
    }));
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

export default App;
