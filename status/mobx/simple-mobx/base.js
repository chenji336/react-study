import { observable, autorun, computed } from 'mobx';

// mobx5.x版本如果传入的是简单变量（number、string），则会报错，监听不了
// var value = observable(1); 

var numbers = observable([1,2,3]);

var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'
disposer(); // unsbusbribe

// 不会再输出任何值。`sum` 不会再重新计算。
numbers.push(5);



