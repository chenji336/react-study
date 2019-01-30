import { observable } from "mobx";

export default class TodoModel {
  id = Math.random();
  @observable title;
  @observable finished = false;

  constructor(title, finished) {
    this.title = title;
    this.finished = finished;
  }
}
