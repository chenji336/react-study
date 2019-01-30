import React from 'react';
import { observable, configure, action } from 'mobx';
import { observer } from 'mobx-react';

// useStrict
configure({
    enforceActions: 'always'
})

class MyState {
    @observable num = 0;
    @action addNum = () => {
        this.num++;
    }
}

const newState = new MyState();

@observer // 没有observer则下面不可调用newState的内容
export default class SimpleMbox extends React.Component {
    render() {
        return (
            <div>
                <p>{newState.num}</p>
                <button onClick={newState.addNum}>+1</button>
            </div>
        );
    }
}   