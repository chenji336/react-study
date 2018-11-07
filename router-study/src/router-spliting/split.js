import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Loadable from 'react-loadable';


// no split 只会生成一个1.xxx.js
/* import Home from './Home';
import About from './About'; */

// split build之后生成3个num.xxx.js
const Loading = () => <div>loading...</div>;
const Home = Loadable({
    loader: () => import('./Home'),
    loading: Loading
});
const About = Loadable({
    loader: () => import('./About'),
    loading: Loading
});

export default class Split extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/about' component={About}></Route>
                </Switch>
            </Router>
        );
    }
}