import React, { useState, useEffect} from 'react'
import {
    Redirect,
    Route
} from 'react-router-dom'
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
    let isAuthed = false
    const authCheck = () => {
        const token = localStorage.getItem('token')
        try {
            if(jwt_decode(token)) {
                isAuthed = true
            }
        } catch (err) {
            console.log(err)
        }
    }

    authCheck()
    return (
      <Route
        {...rest}
        render={props =>
        isAuthed ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute