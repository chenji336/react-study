import React from 'react';

// 高阶函数多一层转化
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('先前的属性：', prevProps);
      console.log('当前属性：', this.props);
    }
    
    render() {
      // 使用forwardedRef作为一个ref属性传入组件中
      const { forwardedRef, ...rest } = this.props;
      return (
        <Component ref={forwardedRef} {...rest} />
      );
    }
  }
  
  // 使用React.forwardRef对LogProps组件进行转发
  return React.forwardRef((props, ref) => (
    <LogProps forwardedRef={ref} {...props} />
  ));
}


// 和上面对比，就是ref代替了props.inputRef
const Child = React.forwardRef((props, ref) =>  (
    <div>
        <input defaultValue='100' ref={ref}/><br/>
        {props.a}
    </div>
))
const LogChild = logProps(Child);

export default class Father extends React.Component {
    componentDidMount() {
        // 先render才会执行didMount，因此this.textInputRef是有值的
        if (this.textInputRef) {
            console.log(this.textInputRef.value)
            this.textInputRef.focus();
        }
    }

    render() {
        return (
            <LogChild ref={el => this.textInputRef=el}></LogChild>
        );
    }
}