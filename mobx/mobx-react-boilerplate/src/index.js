import React from "react";
import { render } from "react-dom";
import DevTools, { setLogEnabled } from "mobx-react-devtools";
import { action, runInAction } from 'mobx';

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
// import TodoModel from "./models/TodoModel";
// import SimpleMbox from './components/SimpleMbox';
// import CrossMbox from './components/CrossMbox';
// import ProviderMobx from './components/ProviderMbox';
const store = new TodoListModel();
// setLogEnabled(true); // 开启日志


store.addTodo("Get Coffee");
store.addTodo("Write simpler code");
// .finished=true放在render后面不会被渲染，以后发现原因在进行补充(因为checkbox的check写成了defaultCheck)
// runInAction(() => store.todos[0].finished = true); // 严格模式 actoin(fn)()
// store.todos[0].finished = true // 非严格模式

// TodoList如果没有@observer，后续接受不到下面这条添加的
setTimeout(() => {
  store.addTodo("Get a cookie as well", true);
}, 2000);

render(
  <div>
    {/* <DevTools /> */}
    <TodoList store={store} />
    {/* <SimpleMbox></SimpleMbox> */}
    {/* <CrossMbox></CrossMbox> */}
    {/* <ProviderMbox></ProviderMbox> */}
  </div>,
  document.getElementById("root")
);
runInAction(() => store.todos[0].finished = true); // 严格模式 actoin(fn)()


// playing around in the console
// window.store = store;
