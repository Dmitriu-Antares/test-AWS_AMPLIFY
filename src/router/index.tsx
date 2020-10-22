import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Login from '../containers/Login'
import Home from '../containers/Home'


const Routes = () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
)


export default Routes
