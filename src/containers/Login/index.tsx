import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { loginAction, removeLoginError } from '../../redux/reducers/auth'
import isAuthed from '../../helpers'

import Header from '../../components/Header'


const styles = () => ({
    wrapper: {
        padding: '1rem',
        marginTop: '1rem'
    }
})

// class component example with redux
class Login extends Component<any, any> {
    state =  {
        login: '',
        password: '',
        loginError: false,
        passwordError: false
    }

    componentWillMount() {
        if(isAuthed()) {
            this.props.history.push('/profile')
        }
    }

    componentWillUnmount() {
        const { loginError, onRemoveLoginErr } = this.props
        if(loginError) {
            onRemoveLoginErr()
        }
    }

    handleLogin = () => {
        const { login, password } = this.state
        const { onLogin } = this.props
        const redirect = () => this.props.history.push('/profile')
        onLogin(login, password, redirect)   
    }

    render() {
        const { loginError, classes } = this.props
        const { passwordError, login, password } = this.state
        return (
            <Fragment>
                <Header />
                <Container>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={12} md={8} lg={4} >
                            <Paper className={classes.wrapper}>
                                <Typography variant="h4" >Sign In</Typography>
                                <ValidatorForm
                                    ref="form"
                                    onSubmit={this.handleLogin}
                                    onError={errors => console.log(errors)}
                                >
                                    <TextValidator
                                        fullWidth
                                        label="Email"
                                        onChange={e => this.setState({login: e.target.value})}
                                        name="email"
                                        value={login}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                    />
                                    <Box m={1} />
                                    <TextField
                                        fullWidth
                                        value={password}
                                        onChange={e => this.setState({password: e.target.value})}
                                        error={passwordError}
                                        id="login-password"
                                        label="Password"
                                        type="password"
                                        helperText="min length 6 chars"
                                    />
                                    <Box m={3} />
                                    <Button
                                        variant="contained"
                                        disabled={login.length < 4 || password.length < 6}
                                        color="primary"
                                        size="large"
                                        type="submit">
                                        <Typography>Continue</Typography>
                                    </Button>
                                    {loginError !== null && <Typography color="error">{loginError}</Typography>}
                                </ValidatorForm> 
                                <Link to="/registration">
                                    <Typography>
                                        Don`t have an account? Sign Up 
                                    </Typography>
                                </Link>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        loginError: state.authReducer.loginError
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, pass, redirect) => dispatch(loginAction(email, pass, redirect)),
        onRemoveLoginErr: () => dispatch(removeLoginError()),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))