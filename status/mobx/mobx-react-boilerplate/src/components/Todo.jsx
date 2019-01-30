import React, { Component } from "react";
import { observer } from "mobx-react";
import { action } from 'mobx'

const Todo = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={(todo.finished)} 
      onChange={action(() => (todo.finished = !todo.finished))} // 严格模式需要action
    />
    {todo.title}
  </li>
));

// function Todo(props) {
//   console.log('Todo-props:', props)
//   return (<li>
//     <input
//       type="checkbox"
//       checked={props.todo.finished}
//       onClick={() => (props.todo.finished = !props.todo.finished)}
//     />
//     {todo.title}
//   </li>);
// }

export default Todo;
