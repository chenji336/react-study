import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Index = () => <h2>Home</h2>;
// url对应Link的to   path对应Route的path
const About = ({ match }) => <h2>About-{match.url}-{match.path}</h2>;
const Users = () => <h2>Users</h2>;
const Always = () => <h2>Always</h2>;

const SwitchComponent = () => (
    <Router>
        <div>
            <Switch>
                <Route path='/' exact component={Index}></Route>
                {/* 不使用switch，就会执行两次 */}
                <Route path='/about/:id' component={About}></Route>
                <Route path='/about' component={About}></Route>
                <Route path='/about' component={About}></Route>
                <Route path='/users' component={Users}></Route>
                {/* 匹配所有路由, 可用来匹配404 */}
                <Route component={Always}></Route>
            </Switch>
        </div>
    </Router>
);

export default SwitchComponent;