#创建自己的状态管理工具
##运行
直接运行index.html就可以

##流程梳理
谁监听： Component构造函数进行subscribe
谁触发： state改变的时候通过proxy触发
store： (dispatch -> actions) -> (commit(reducer) -> mutation) -> 改变state -> proxy

##对比
我的（简单缓存） 这个  redux

##备注
现在chrome可以使用import，所以不需要进行webpack转成es5
