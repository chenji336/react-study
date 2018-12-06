import { createStore, combineReducers } from 'redux';
// var Redux = require('redux')
// var createStore = Redux.createStore

// counter就是reducer，根据不同的dispatch产生新的state的一个程序
// 可以跟之前对比，现在counter相当于是combineReducers的角色了
function counter(state = {}, action) {
  return {
    testNest: testNest(state.testNest, action)
  };
}

function testNest(val = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return val + 1;
    case 'DECREMENT':
      return val - 1;
    default:
      return val;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => {
  console.log(store.getState());
}

);

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2 在上面的基础上+1，所以理解就是store会把之前的state保存，然后当成下一个state传递过去
store.dispatch({ type: 'DECREMENT' });
// 1

// console.log(store.getState()); // 也可以卸载subscribe外面