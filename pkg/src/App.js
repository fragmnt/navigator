import React, { Component } from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';

import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';

import { AppBar, Typography, IconButton, Toolbar} from '@material-ui/core';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded';
import InfoIcon from '@material-ui/icons/Info';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount = () => {
        localStorage.getItem('token') ? this.setState({ isAuthenticated: true }) : this.setState({ isAuthenticated: false });
    };

    render() {

        const {isAuthenticated} = this.state;

        return(
        <>
                <AppBar position="static" className="appbar_black">
                <Toolbar>
                <IconButton edge="start" className="menuButton" style={{
                    color: '#1294f3'
                }} aria-label="menu">
                <TrackChangesIcon/>
                </IconButton>
                <Typography variant="h6" className="title">
                    Navigator
                </Typography>
                <IconButton className="menuBtn">{isAuthenticated ? <AccountBoxIcon/> : <InfoIcon/>}</IconButton>
            </Toolbar>
        </AppBar>
        <Switch>
            <Route path="/dashboard">
                <DashboardPage/>
            </Route>
            <Route exact path='/'>
               {isAuthenticated ? <Redirect to="/dashboard"/> : <HomePage/>}
            </Route>
        </Switch>
        </>
        );
    }
}

export default withRouter(App);