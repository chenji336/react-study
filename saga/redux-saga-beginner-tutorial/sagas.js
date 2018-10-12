import { delay } from 'redux-saga';
import { call, put, takeEvery, all } from 'redux-saga/effects';

export function* helloSaga() {
    console.log('hello saga');
}

export function* incrementAsync() {
    // delay(1000)返回的是一个promise不易于测试
    // yield delay(1000);
    yield call(delay, 1000); // 返回的是{CALL: {fn:delay, arg: [1000]}},这样middle或则测试方就可以知道返回的数据进行比对
    // put会返回{PUT:{type: 'INCREMENT'}}，这个时候middle根据获取到的值以及类型（put或则call等）,调用dispatch
    yield put({ type: 'INCREMENT' });
}

export function* watchIncrementAsync() {
    // 跟helloSaga一样，执行一次
    // 就算reducers里面有INCREMENT_ASYNC也会执行函数incrementASync
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ]);
}