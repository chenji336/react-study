import React, { PureComponent } from 'react'

class Simple extends PureComponent {

  componentWillMount() {
      this.setState = {
          data: localStorage.getItem('data')
      };
  }
  render() {
    return (
      <div>
        {this.state.data}
      </div>
    )
  }
}

// 如果我所有的组件都需要获取getItem('data')了？
// 使用高阶组件进行封装
function withPersistentData(WrappedComponent) {
    return class extends React.Component {

        componentWillMount() {
            this.setState({
                data: localStorage.getItem('data')
            });
        }
        render() {
            // 把props进一步传递下去
            // 如果hoc需要使用的一些props，WrappedComponent不需要的则可以不传递过去
          return <WrappedComponent {...this.props} data={this.state.data}></WrappedComponent>
        }
    }
}

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                {/* 跟Simple比较，state转变成props */}
                {this.props.data}
            </div>
        );
    }
}

const MyComponentWithPersistentData = withPersistentData(MyComponent);
export default MyComponentWithPersistentData;

