import React from 'react';
import { observable, action, computed, configure } from 'mobx';
import { observer } from 'mobx-react';

configure({
  enforceActions: 'always'
});
class MyState {
    @observable num1 = 0;
    @observable num2 = 100;
  
    @action addNum1 = () => {
      this.num1 ++;
    };
    @action addNum2 = () => {
      this.num2 ++;
    };
    @computed get total() {
      return this.num1 + this.num2;
    }
  }
  
  const newState = new MyState();
  
  // 没有observer就调用不了computed函数
  const AllNum = observer((props) => <div>num1 + num2 = {props.store.total}</div>);
  // 没有observer就调用不了函数 addNum
  const Main = observer((props) => (
    <div>
      <p>num1 = {props.store.num1}</p>
      <p>num2 = {props.store.num2}</p>
      <div>
        <button onClick={props.store.addNum1}>num1 + 1</button>
        <button onClick={props.store.addNum2}>num2 + 1</button>
      </div>
    </div>
  ));
  
  @observer // 这里去除掉也没有影响，是因为子组件其实也有observer，如果用到了store的函数就需要去掉注释
  export default class CrossMobx extends React.Component {
    
    constructor(props) {
      super(props);
      this.context = React.createContext(newState);
    }
    render() {
      return (
        <div>
          <Main store={newState} />
          <AllNum store={newState} />
        </div>
      );
    }
  }
  