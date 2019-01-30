
// rootReducer.js
import { combineReducers, createStore } from "redux";

// reducers.js
const theDefaultReducer = (state = 0, action) => state;

const firstNamedReducer = (state = 1, action) => state;

const secondNamedReducer = (state = 2, action) => state;

// 使用 ES6 的对象字面量简写方式定义对象结构
// const rootReducer = combineReducers({
//     theDefaultReducer,
//     firstNamedReducer,
//     secondNamedReducer
// });

// 自己定义combineReducers
const combineReducersSelf = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                // console.log('state:', state);
                // console.log('key:', key);
                // console.log(state[key]);
                nextState[key] = reducers[key](state[key], action);
                return nextState;
            },
            {}
        );
    };
};
const rootReducer = combineReducersSelf({
    theDefaultReducer,
    firstNamedReducer,
    secondNamedReducer
});

const store = createStore(rootReducer);
console.log(store.getState());
// {theDefaultReducer : 0, firstNamedReducer : 1, secondNamedReducer : 2}

// ？？这个时候如何dispatch？对比index.js看，其实dispatch传任何值都不会影响上面的输出