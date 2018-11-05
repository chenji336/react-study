import React, { Component } from 'react';
import './App.css';
import { ThemeContext, themes } from './context/theme-context';
import ThemeTogglerButton from './context/theme-toggler-button';
import CreateRef from './refs/createRef';
import CbRef from './refs/cbRef';
import ForwarRefCommon from './refs/forwardRef-common';
import ForwardRefHigh from './refs/forwardRef-high';
import Portals from './portals/index';
import HocSimpleComponent from './hoc/simple';
import PropsRender from './props-render';

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
        {/* <Content /> */}
        {/* <CreateRef></CreateRef> */}
        {/* <CbRef></CbRef> */}
        {/* <ForwarRefCommon></ForwarRefCommon> */}
        {/* <ForwardRefHigh></ForwardRefHigh> */}
        {/* <Portals></Portals> */}
        {/* <HocSimpleComponent></HocSimpleComponent> */}
        <PropsRender></PropsRender>
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
