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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Typography } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { signUpAction, removeAuthError } from '../../redux/reducers/auth'
import isAuthed from '../../helpers'

import Header from '../../components/Header'


const styles = () => ({
    wrapper: {
        padding: '1rem',
        marginTop: '1rem'
    }
})

// class component example with redux
class Registration extends Component<any, any> {
    state =  {
        email: '',
        password: '',
        repeatPassword: '',
        loginError: false,
        passwordError: false,
        role: 'candidate'
    }

    componentWillMount(){
        if(isAuthed()) {
            this.props.history.push('/profile')
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }
 
    componentWillUnmount() {
        const { authError, removeError } = this.props
        if(authError){
            removeError()
        }
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }

    handleSignUp = () => {
        const { signUp } = this.props
        const { email, password, role } = this.state
        const redirect = (role) => this.props.history.push(role ? '/onboarding' : '/profile')
        signUp(email, password, role, redirect)
        //
    }

    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    render() {
        const { classes, authError } = this.props
        const { email, password, repeatPassword, role } = this.state
        return (
            <Fragment>
                <Header />
                <Container>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={12} md={8} lg={4} >
                            <Paper className={classes.wrapper}>
                                <Typography variant="h4" >Sign Up</Typography>
                                <ValidatorForm
                                    ref="form"
                                    onSubmit={this.handleSignUp}
                                    onError={errors => console.log(errors)}
                                >
                                    <TextValidator
                                        fullWidth
                                        label="Email"
                                        onChange={this.handleEmail}
                                        name="email"
                                        value={email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                    />
                                    <Box m={1} />
                                    <TextValidator
                                        fullWidth
                                        label="Password"
                                        onChange={e => this.setState({password: e.target.value})}
                                        name="password"
                                        type="password"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        value={password}
                                    />
                                    <Box m={1} />
                                    <TextValidator
                                        fullWidth
                                        label="Repeat password"
                                        onChange={e => this.setState({repeatPassword: e.target.value})}
                                        name="repeatPassword"
                                        type="password"
                                        validators={['isPasswordMatch', 'required']}
                                        errorMessages={['password mismatch', 'this field is required']}
                                        value={repeatPassword}
                                    />
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="gender" name="gender1" value={role} onChange={e => this.setState({role: e.target.value})}>
                                            <FormControlLabel value="candidate" control={<Radio />} label="I’m looking for job opportunities" />
                                            <FormControlLabel value="recruiter" control={<Radio />} label="I'm a hiring manager or recruiter" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Box m={3} />
                                    <Button
                                        variant="contained"
                                        disabled={false}
                                        color="primary"
                                        size="large"
                                        type="submit">
                                        <Typography>Sign Up</Typography>
                                    </Button>
                                    {authError !== null && <Typography color="error">{authError}</Typography>}
                                </ValidatorForm>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer.isAuthed,
        authError: state.authReducer.authError,
        role: state.authReducer.role
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (email, password, role, redirect) => dispatch(signUpAction(email, password, role, redirect)),
        removeError: () => dispatch(removeAuthError())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Registration))