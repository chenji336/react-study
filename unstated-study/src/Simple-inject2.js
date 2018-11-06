import React from 'react';
import { Container, Subscribe } from 'unstated';
import { CounterContainer } from './Simple-inject';

// const container = new CounterContainer(123);

// 如果to={}使用不一致，则显示数据不一样
export function Count2() {
    return (<Subscribe to={[CounterContainer]}>
        {
            counter => (
                <div>
                    {/* 没有inject条件下 */}
                    {/* **不能直接使用onClick={counter.increment},this为undefined */}
                     <button onClick={() => counter.increment()}>+</button>
                     <span>{counter.state.count}</span>
                     <button onClick={() => counter.decrement()}>-</button>
                </div>
            )
        }
    </Subscribe>);
}