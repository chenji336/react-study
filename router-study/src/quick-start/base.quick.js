import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Index = () => <h2>Home</h2>;
// url对应Link的to   path对应Route的path
const About = ({match}) => <h2>About-{match.url}-{match.path}</h2>;
const Users = () => <h2>Users</h2>;

const BaseQuick = () => (
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        {/* 没有Router使用Link报错 */}
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about/xxxx'>About</Link>
                    </li>
                    <li>
                        <Link to='/users'>Users</Link>
                    </li>
                </ul>
            </nav>

            <Route path='/' exact component={Index}></Route>
            <Route path='/about/:id' component={About}></Route>
            <Route path='/users' component={Users}></Route>
        </div>
    </Router>
);

export default BaseQuick;