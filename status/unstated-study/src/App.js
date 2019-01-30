import React, { Component } from 'react';
import { Provider } from 'unstated';
import Counter from './Simple';
import CounterInject, {CounterContainer} from './Simple-inject';
import { Count2 } from './Simple-inject2';

// inject container也没发现什么变化，在使用的组件中to={container}会改变
const container = new CounterContainer(123);

class App extends Component {
  render() {
    return (
      <Provider>
        {/* <Counter /> */}
        <CounterInject inject={[container]}></CounterInject>
        <Count2></Count2>
      </Provider>
    );
  }
}

export default App;
