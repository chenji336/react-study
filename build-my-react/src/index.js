import React from './react';
import ReactDOM from './react-dom';

// function Welcome( props ) { // 没有使用到React，但是还要引用，因为使用了React.createElement
//     return <h1>Hello, {props.name}</h1>;
// }

class Welcome extends React.Component { // 继承的时候就已经触发了constructor
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

const element = <Welcome name='chenji' />
// const element = (<div>
//     <Welcome name="Sara" />
//     <Welcome name="Cahal" />
//     <Welcome name="Edite" />
// </div>);
// class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <Welcome name="Sara" />
//                 <Welcome name="Cahal" />
//                 <Welcome name="Edite" />
//             </div>
//         );
//     }
// }
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        };
    }

    componentWillUpdate() {
        console.log('componentWillUpdate');
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    onClick() {
        this.setState({
            num: this.state.num + 1
        });
    }

    render() {
        return (
            <div onClick={() => this.onClick()}>
                <h1>number: {this.state.num}</h1>
                <button>add</button>
                {
                    // 测试对比children的insertBefore(添加了这一段=>childNodes多出一个text)
                    this.state.num !== 0 && <p>hello</p>
                }
                <div>chenji</div>
            </div>
        );
    }
}
ReactDOM.render(
    // element,
    // <App />,
    <Counter />,
    document.getElementById('root')
);