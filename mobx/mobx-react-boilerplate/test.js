import {observable, action} from 'mobx';
class Store {
  @observable number = 0;
  @action add = () => {
    this.number++;
    // console.log(this.number)
  }
}

const newStore = new Store();
newStore.add();