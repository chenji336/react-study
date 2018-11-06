import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const NextQuick = () => (
    <Router>
        <div>
            <Header />

            <Route exact path='/' component={Index}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/topics' component={Topics}></Route>
        </div>

    </Router>
);

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Topic = ({ match }) => <h3>Requested Params: {match.params.id}</h3>;
const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>

        <ul>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        {/* 嵌套的路由不需要写Router，否则点击切换无效 */}
        <Route
            exact
            path={match.path}
            render={(props) => <h3>Please Select a topic.{JSON.stringify(props)}</h3>}
        >
        </Route>
        <Route path={`${match.path}/:id`} component={Topic}></Route>

    </div>
);

const Header = () => (
    <ul>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/about'>About</Link>
        </li>
        <li>
            <Link to='/topics'>Topics</Link>
        </li>
    </ul>
);

export default NextQuick;