import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, NavLink, Switch } from 'react-router-dom';
import './index.css';
const Index = () => <h2>Home</h2>;
// url对应Link的to   path对应Route的path
const About = ({ match }) => <h2>About-{match.url}-{match.path}</h2>;
const Users = () => <h2>Users</h2>;

const LinkComponent = () => (
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about/xxxx'>About</Link>
                    </li>
                    <li>
                        <NavLink to='/users' activeClassName='active'>Users</NavLink>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path='/' exact component={Index}></Route>
                <Route path='/about/:id' component={About}></Route>
                <Route path='/users' component={Users}></Route>
                {/* 没有switch使用Redirect会报错 */}
                <Redirect to='/'></Redirect> 
            </Switch>

        </div>
    </Router>
);

export default LinkComponent;