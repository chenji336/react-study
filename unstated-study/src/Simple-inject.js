import React from 'react';
import { Container, Subscribe } from 'unstated';

export class CounterContainer extends Container {
    constructor(initCount) {
        super(...arguments); // 不写报错
        this.state = {
            count: initCount || 0
        }
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        });
    }

    decrement = () => {
        this.setState({
            count: this.state.count - 1
        });
    }
}

const container = new CounterContainer(123);

export default function CountInject() {
    return (<Subscribe to={[CounterContainer]}>
        {
            counter => (
                <div>
                    {/* **不能直接使用onClick={counter.increment},this为undefined */}
                    {/* increment定义如果是() => {}则可以直接使用counter.increment */}
                     <button onClick={counter.increment}>+</button>
                     <span>{counter.state.count}</span>
                     <button onClick={() => counter.decrement()}>-</button>
                </div>
            )
        }
    </Subscribe>);
}
