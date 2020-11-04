import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import PrivateRoute from './privateRoute'

import Login from '../containers/Login'
import Home from '../containers/Home'
import Onboarding from '../containers/Onboarding'
import Registration from '../containers/Registration'
import Profile from '../containers/Profile'


const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <PrivateRoute path="/onboarding" component={Onboarding} />
            <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    </Router>
)


export default Routes
