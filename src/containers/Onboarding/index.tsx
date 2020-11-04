import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { protectedBackTest } from '../../api'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MobileStepper from '@material-ui/core/MobileStepper'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import Header from '../../components/Header'
import SearchStatus from './components/SearchStatus'
import Role from './components/Role'
import Specialities from './components/Specialities'
import Duration from './components/Duration'
import Skills from './components/Skills'
import Options from './components/Options'
import Salary from './components/Salary'
import Education from './components/Education'
import Jobs from './components/Jobs'
import Additions from './components/Additions'

const useStyles = makeStyles(() => ({
    stepper: {
        '& >div': {
            width: '100%'
        }
    }
}))

const Onboarding = props => {
    const s = useStyles()
    const [activeStep, setActiveStep] = React.useState(0);
    const onboarding = useSelector(state => state.authReducer.onboarding)
    const roles = useSelector(state => state.authReducer.roles)
    const userRole = useSelector(state => state.profileReducer.userRole)
    const state  = useSelector(state => state)
    /*

    // onLogin create isOnboarded = true
    useEffect(() => {
        console.log(state)
        if(userRole !== null) {
            props.history.push('/profile')
        }
    }, [userRole])
    */

    const stepComponents = [
        {
            title: 'Search Status',
            component: () => <SearchStatus onboarding={onboarding} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Role',
            component: () => <Role onboarding={onboarding} roles={roles} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Specialities',
            component: () => <Specialities onboarding={onboarding} roles={roles} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Duration',
            component: () => <Duration onboarding={onboarding} roles={roles} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Skills',
            component: () => <Skills onboarding={onboarding} roles={roles} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Options',
            component: () => <Options onboarding={onboarding} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Salary',
            component: () => <Salary onboarding={onboarding} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Education',
            component: () => <Education onboarding={onboarding} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Jobs',
            component: () => <Jobs onboarding={onboarding} handleBack={handleBack} handleNext={handleNext} />
        },
        {
            title: 'Additions',
            component: () => <Additions onboarding={onboarding} history={props.history} handleBack={handleBack} handleNext={handleNext} />
        },
    ]

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    protectedBackTest().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
    return (
        <div>
            <Header />
            <br/>
            <Container>
                <Grid
                container
                justify="center"
                >
                    <Grid item xs={12} md={8} lg={8}>
                        <Box m={3} />
                        <Typography variant='caption' color='textSecondary'>{activeStep+1} of {stepComponents.length} steps</Typography>
                        <MobileStepper
                        className={s.stepper}
                        variant="progress"
                        steps={stepComponents.length}
                        position='static'
                        activeStep={activeStep}
                        nextButton={null}
                        backButton={null}
                        />
                        <Box m={3} />
                            {stepComponents[activeStep].component()}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Onboarding