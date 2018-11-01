import React from 'react';

function Child(props) {
    return (
        <input ref={props.inputRef}/>
    );
}

export default class Father extends React.Component {
    componentDidMount() {
        // 先render才会执行didMount，因此this.textInputRef是有值的
        if (this.textInputRef) {
            this.textInputRef.focus();
        }
    }

    render() {
        return (
            <Child inputRef={el => this.textInputRef=el}></Child>
        );
    }
}