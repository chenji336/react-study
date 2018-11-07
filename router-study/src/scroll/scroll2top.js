import React from 'react';
import Home from './Home';
import About from './About';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';

class Scroll2TopContainer extends React.Component {

    constructor(props) {
        super(props);
        // 验证didUpdate还是有用的（开始使用BrowserRouter所以每次进入路由只执行didMount）
        this.state = {
            value: 'a'
        }
    }

    change = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    componentDidMount() {
        console.log('componentDidMount-this.props:', this.props)
        setTimeout(() => {
            // 加载完成之后不代表绘画完成了，一般绘画完成在20ms内，所以setTimeout
            window.scrollTo(0, 0) 
        }, 100);
        
    }

    componentDidUpdate(preProps) {
        // 切换路由不执行，因为每次切换路由都是第一次执行，不会触发componentDidUpdate
        console.log('componentDidUpdate:',preProps.location);
        console.log(this.props.location);
        if (preProps.location !== this.props.location) {
            setTimeout(() => {
                // 所以说还是需要渲染完成之后才能scrollTo
                window.scrollTo(0, 0);
            }, 0);
        }
    }

    // 第一次渲染的时候也不触发
    shouldComponentUpdate() {
        console.log('shoulComponentUpdate')
        return true;
    }

    componentWillUnmounts() {
        alert(1)
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <div>
                <p>i am xxxx</p>
                <div>{this.props.children}</div>
                <input value={this.state.value} onChange={this.change} />
            </div>
        );
    }
}

// 可以获取到Route的props（就算没有被Route引用） withRouter也需要在Router里面
const ScrollWithRouter = withRouter((props) => <Scroll2TopContainer {...props}></Scroll2TopContainer>);
// const ScrollWithRouter = withRouter(Scroll2TopContainer); // 与上面等价

// 应用场景：让Home滚动到最底部=>跳转到about->点击回退按钮
const Scroll2Top = () => {
    return (
        // 注意路由类型，试一下 HashRouter.使用BrowserRouter每次切换路由都刷新页面
        <Router>
            <ScrollWithRouter>
                <Route exact  path='/' component={Home}></Route>
                <Route path='/about' component={About}></Route>
            </ScrollWithRouter>
        </Router>
    )
};
export default Scroll2Top;
