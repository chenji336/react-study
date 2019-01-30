import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Todo from "./Todo";

@observer
class TodoList extends React.Component {
  // 为啥之类需要@observalb？ 如果去掉：input打不出来(难道是@observer装饰的class的this.xxx都要@observable?)
  // this.xxx重新赋值是不会触发render的重新渲染的，这里可以渲染是因为监听来newTodoTitle，否则就需要使用this.state
  // @observable newTodoTitle = "";

  // 使用state的结果跟@boservalbe在本组件的作用是一样的
  state = { 
    newTodoTitle: ''
  };

   

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.state.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {this.props.store.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.store.unfinishedTodoCount}
      </div>
    );
  }

  // @action
  handleInputChange = e => {
    console.log('e.taget.value:', e.target.value) // 如果开启来mobx的日志，那么log在stack里面
    // this.newTodoTitle = e.target.value;
    this.setState({
      newTodoTitle: e.target.value
    });
  };

  // @action
  handleFormSubmit = e => {
    this.props.store.addTodo(this.state.newTodoTitle);
    this.newTodoTitle = "";
    // this.props.store.todos[0].finished = true; // 没有反应的，不会渲染到界面上
    e.preventDefault();
  };
}

export default TodoList;
