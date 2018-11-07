import React, { Component } from 'react';
import './App.css';

/* eslint-disable */
import BaseQuick from './quick-start/base.quick';
import NestQuick from './quick-start/nest.quick';
import SwitchComponent from './basic-component/switch.component';
import LinkComponent from './basic-component/link.component';
import Split from './router-spliting/split';
import Scroll2Top from './scroll/scroll2top';

class App extends Component {

  render() {
    return (
      <div>
        {/* <BaseQuick></BaseQuick> */}
        {/* <NestQuick></NestQuick> */}

        {/* <SwitchComponent></SwitchComponent> */}
        {/* <LinkComponent></LinkComponent> */}

        {/* <Split></Split> */}
        <Scroll2Top></Scroll2Top>
      </div>
    );
  }
}

export default App;
