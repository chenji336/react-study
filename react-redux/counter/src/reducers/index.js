export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 下面的效果是一样的，不过import的时候需要import { counter } from './reducers'
  // export function counter(state = 0, action) {
  //   switch (action.type) {
  //     case 'INCREMENT':
  //       return state + 1
  //     case 'DECREMENT':
  //       return state - 1
  //     default:
  //       return state
  //   }
  // }