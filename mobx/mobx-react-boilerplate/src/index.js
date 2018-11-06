import React from "react";
import { render } from "react-dom";
import DevTools, { setLogEnabled } from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
// import TodoModel from "./models/TodoModel";
// import SimpleMbox from './components/SimpleMbox';
// import CrossMbox from './components/CrossMbox';
// import ProviderMobx from './components/ProviderMbox';
const store = new TodoListModel();
setLogEnabled(true); // 开启日志
render(
  <div>
    <DevTools />
    <TodoList store={store} />
    {/* <SimpleMbox></SimpleMbox> */}
    {/* <CrossMbox></CrossMbox> */}
    {/* <ProviderMbox></ProviderMbox> */}
  </div>,
  document.getElementById("root")
);

store.addTodo("Get Coffee");
store.addTodo("Write simpler code");
store.todos[0].finished = true;

setTimeout(() => {
  store.addTodo("Get a cookie as well");
}, 2000);

// playing around in the console
window.store = store;
