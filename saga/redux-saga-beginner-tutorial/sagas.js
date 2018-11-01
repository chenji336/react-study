import { delay } from 'redux-saga';
import { call, put, takeEvery, all, take, fork } from 'redux-saga/effects';

export function* helloSaga() {
    console.log('hello saga');
}

export function* incrementAsync() {
    // delay(1000)返回的是一个promise不易于测试
    // yield delay(1000);
    yield call(delay, 1000); // 返回的是{CALL: {fn:delay, arg: [1000]}},这样middle或则测试方就可以知道返回的数据进行比对
    console.log('after delay'); // 肯定是可以执行的，函数都会被触发（内部自己搞定），yield只是为了处理异步消息
    // put会返回{PUT:{type: 'INCREMENT'}}，这个时候middle根据获取到的值以及类型（put或则call等）,调用dispatch
    yield put({ type: 'INCREMENT' });
}

export function* watchIncrementAsync() {
    // 跟helloSaga一样，执行一次
    // 就算reducers里面有INCREMENT_ASYNC也会执行函数incrementASync
    // yield takeEvery('INCREMENT_ASYNC', incrementAsync); // incrementAsync作为第二个参数（必须是Generator），每次触发的时候都会执行

    // 使用take跟上面的takeEvery等价（不过take类似于pull拉，takeEvery类似于push推；因此take能更好的控制）
    while(true) {
        console.log('INCREMENT_ASYNC-start');
        yield take('INCREMENT_ASYNC'); // 1.如果注释掉，就会无限去执行dispatch;2.如果改成'*'，那么所有的action都会触发下面的执行

        // 下面两行等价 yield call(incrementAsync);
        /* yield call(delay, 1000);
        yield put({ type: 'INCREMENT' }); */

        // call会阻塞-只有incrementAsync执行完之后再执行后面的；
        // fork无阻塞，会先执行后面的，等待自己执行完成之后在执行
        yield call(incrementAsync); // 如果想要使用function* incrementAsync,需要yield，当然call(incrementAsync)也可以
        console.log('INCREMENT_ASYNC-end');
    }
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ]);
}