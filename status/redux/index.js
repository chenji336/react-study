import { createStore, combineReducers } from 'redux';
// var Redux = require('redux')
// var createStore = Redux.createStore

// counter就是reducer，根据不同的dispatch产生新的state的一个程序
// 可以跟之前对比，现在counter相当于是combineReducers的角色了
function reducers(state = {}, action) {
  console.log('state:', state);
  return {
    reducer1: reducer1(state.reducer1, action),
    reducer2: reducer2(state.reducer2, action)
  };
}

// 这个就是一个reducer
// 每次的val都会被保存下来
function reducer1(val = 0, action) {
  console.log('进入了reducer1,action:', action)
  switch (action.type) {
    case 'INCREMENT':
      return val + 1;
    case 'DECREMENT':
      return val - 1;
    default:
      return val;
  }
}


// 这个就是一个reducer
// 
function reducer2(val = { x: 1 }, action) {
  console.log('进入了reducer2,action:', action)

  switch (action.type) {
    case 'OBJECT':
      return {...val, x:2}; // 为什么要返回新的对象（如果在react中使用，不返回新对象是不会被渲染的，可以理解在shouldUpdate中比较新老对象）
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(reducers); // 这里会执行所有reducer，但因为初始状态原因所以没有影响

// 可以手动订阅更新，也可以事件绑定到视图层。
// *必须放在dispatch前面，因为dispatch才会触发subscribe的callback
let unsubscribe = store.subscribe(() => { // unsubscribe是返回的一个注销函数
  // 在react就是触发这个然后更新状态的
  console.log('监听：', store.getState());
});


store.dispatch({ type: 'INCREMENT' })
// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
// store.dispatch({ type: 'INCREMENT' }); // {type: 'INCREMENT'}就是一个action，你会发现会触发所有的reducer，因为redux只有一个store
// 1
store.dispatch({ type: 'INCREMENT' })
unsubscribe(); //注销，下面会执行，但是已经不监听了


store.dispatch({ type: 'OBJECT' });
// // 2 在上面的基础上+1，所以理解就是store会把之前的state保存，然后当成下一个state传递过去
// store.dispatch({ type: 'DECREMENT' });
// 1

// console.log(store.getState()); // 也可以卸载subscribe外面
