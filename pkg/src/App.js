import React, { Component } from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount = () => {

    };

    render() {

        const {isAuthenticated} = this.state;

        return(<Switch>
            <Route path="/dashboard">
                <div>ok</div>
            </Route>
            <Route exact path='/'>
               {isAuthenticated ? <Redirect to="/dashboard"/> : <HomePage/>}
            </Route>
        </Switch>);
    }
}

export default withRouter(App);