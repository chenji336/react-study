import { createStore } from 'redux';

function reducers(state = 0, action) {
  return counter(state, action)
}

// 这个就是一个reducer
// 每次的val都会被保存下来
function counter(val = 0, action) {
  console.log('进入了counter,action:', action)
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
let store = createStore(reducers); // 这里会执行所有reducer，但因为初始状态原因所以没有影响

// 可以手动订阅更新，也可以事件绑定到视图层。
// *必须放在dispatch前面，因为dispatch才会触发subscribe的callback
let unsubscribe = store.subscribe(() => { // unsubscribe是返回的一个注销函数
  // 在react就是触发这个然后更新状态的
  console.log('监听：', store.getState());
});

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
unsubscribe(); //注销，下面会执行，但是已经不监听了

