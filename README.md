# react-study

## react-workshop
react train里面的内容，包含了react各种个样需要学习的demo

## vanilla-js-state-management
构建自己的state参照的源码

## build-my-react
[从0实现](https://github.com/hujiulong/blog/issues/4)
[代码](https://github.com/hujiulong/simple-react/tree/chapter-1)
###第一章 jsx和虚拟DOM
jsx使用transform-react-jsx会自动处理成js代码（React.createElement)
###第二章 组件和生命周期
render的时候对function进行处理

生命周期：
+ 理解好dom是否已经挂载
+ 是否是第一次加载
###第三章 diff算法
开始： 
不需要渲染，直接对比dom和vnode，初始化dom是undefined，这样可以直接渲染vnode

比较：
+ 真实dom和虚拟dom的比较（如果是两个虚拟dom比较可以摆脱浏览器的束缚，不过各有优缺点），可以不用保存上一个虚拟dom，还可以边对比边更新
+ 跨级的很少，我们只比较同一级别（同一层）的

###第四章 异步的setState
why?
+ 性能问题，每次setState都进行dom比较的话会很耗时
实现：
>全部放在队列中，等待全部完成之后(promise/setTimeout)在执行队列里面的内容
两种方式：
+ 短时间内合并setState
+ setState内部有回掉函数，每次都返回前面state的数据
