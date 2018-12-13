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

    componentDidMount() {
        /***测试state的异步执行*/
        const that = this; // this在function中上下文不是Component
        // 短时间内多次执行setState
        function fn1() {
            for (let i = 0; i < 3; i++) {
                that.setState({
                    num: this.state.num + 1
                });
                console.log(this.state.num);
            }
        }
        // fn1()

        // setState的函数执行
        function fn2() {
            for (let i = 0; i < 3; i++) {
                // 循环全部执行完之后才会执行setState中的回掉函数
                that.setState(prevState => {
                    console.log(prevState.num);
                    return {
                        num: prevState.num + 1
                    }
                });
            }
        }
        fn2();
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