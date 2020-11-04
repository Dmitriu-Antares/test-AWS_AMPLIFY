import React, {Fragment, useState} from 'react'
import { useDispatch } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import styled from 'styled-components';

import { updateUserValue } from '../../../redux/reducers/auth'

import NavButtons from './NavButtons'
import FormLabel from '../../../components/FormLabel'

const CounterWrapper = styled('div')`
    display: flex;
    align-items: center;
`

const Skills = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding, roles } = props
    const [annualSalary, setAnnualSalary] = useState(onboarding.annualSalary === 0 ? '' : onboarding.annualSalary)
    const [perHour, setPerHour] = useState(onboarding.perHour === 0 ? '' : onboarding.perHour)

    const handleNextStep = () => {
        dispatch(updateUserValue(annualSalary, 'annualSalary'))
        dispatch(updateUserValue(perHour, 'perHour'))
        handleNext()
    }

    return (
        <ValidatorForm onSubmit={() => {}}>
            {(onboarding.options.includes('Part-time') || onboarding.options.includes('Full-time')) && (
                <Fragment>
                    <FormLabel
                        sub='Other income factors, such as equity or bonus, can be discussed directly with employers'
                    >What are your minimum base salary expectations? (annually)</FormLabel>
                    <CounterWrapper>
                        <AttachMoneyIcon />
                        <TextValidator
                                onChange={e => setAnnualSalary(e.target.value)}
                                name="annaul"
                                value={annualSalary}
                                type="number"
                                validators={['minNumber:0', 'matchRegexp:^[0-9]+$']}
                                errorMessages={['min 0', 'do not match']}
                        />
                    </CounterWrapper>
                    <Box m={3} />
                </Fragment>
            )}
            {onboarding.options.includes('Contract positions') && (
                <Fragment>
                    <FormLabel>What hourly rate are you looking for in a contract position? </FormLabel>
                    <CounterWrapper>
                        <AttachMoneyIcon />
                        <TextValidator
                                onChange={e => setPerHour(e.target.value)}
                                name="annaul"
                                value={perHour}
                                type="number"
                                validators={['minNumber:0', 'matchRegexp:^[0-9]+$']}
                                errorMessages={['min 0', 'do not match']}
                        />
                        <Typography>/ hour</Typography>
                    </CounterWrapper>
                </Fragment>
            )}
            <NavButtons handleNextStep={handleNextStep} handleBack={handleBack}/>
        </ValidatorForm>
    )
}

export default Skills