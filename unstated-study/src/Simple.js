import React from 'react';
import { Container, Subscribe } from 'unstated';

class CounterContainer extends Container {
    state = {
        count: 0
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        });
    }

    decrement() {
        this.setState({
            count: this.state.count - 1
        });
    }
}

export default function Count() {
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
