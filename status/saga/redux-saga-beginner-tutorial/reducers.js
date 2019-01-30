export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    // case 'INCREMENT_ASYNC':
    // 就算有INCREMENT_ASYNC，执行完之后还是回去执行sagas里面的INCREMENT_ASYNC
    //   return state + 200
    default: 
      return state
  }
}
