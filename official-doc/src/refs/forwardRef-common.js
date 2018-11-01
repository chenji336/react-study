import React from 'react';

// function Child(props) {
//     return (
//         <input ref={props.inputRef}/>
//     );
// }

// 和上面对比，就是ref代替了props.inputRef
const Child = React.forwardRef((props, ref) =>  <input ref={ref}/>)

export default class Father extends React.Component {
    componentDidMount() {
        // 先render才会执行didMount，因此this.textInputRef是有值的
        if (this.textInputRef) {
            this.textInputRef.focus();
        }
    }

    render() {
        return (
            <Child ref={el => this.textInputRef=el}></Child>
        );
    }
}