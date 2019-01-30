import test from 'tape';
import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { incrementAsync } from './sagas';

test('incrementAsync Saga test', (t) => { // t改成assert更好理解`断言`
    const generator = incrementAsync();
    t.deepEqual(
        generator.next().value,
        call(delay, 1000),
        'counter Saga must call delay(1000)' // 理解成测试的标题头
    );

    t.deepEqual(
        generator.next().value,
        put({ type: 'INCREMENT' }),
        'counter Saga must dispatch a INCREMENT action'
    );

    t.deepEqual(
        generator.next(),
        { done: true, value: undefined },
        'counter Saga must be done'
    );

    t.end();
});