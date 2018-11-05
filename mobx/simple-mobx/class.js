import { observable, action, configure, runInAction } from 'mobx';

// useStrict(true); // 严格模式，必须要action（非严格不需要）
// 5.x严格模式通过configure来配置（Deprecated value for 'enforceActions', use 'false' => '"never"', 'true' => '"observed"', '"strict"' => "'always'" instead）
configure({
    enforceActions: 'always'
});
class Store {
    @observable number = 0;
    @observable name = '';
    @action add = () => {
        this.number++;
        console.log(this.number)
    }
    @action load = async () => {
        const data = await getData();
        /* runInAction(() => { // runInAction跟action(fn)()等价
            this.name = data.name;
        }) */

        // 异步函数中对监听的属性赋值，没有action则会报错（严格模式下）
        action(()=> {
            this.name = data.name;
            console.log('this.name:', this.name)
        })();
      }
}

const newStore = new Store();
newStore.add();
newStore.load();


// private
function getData() {
   return new Promise(resolve => {
       setTimeout(() => {
           resolve({
               name: 'chenji'
           })
       }, 1000);
   })
}
