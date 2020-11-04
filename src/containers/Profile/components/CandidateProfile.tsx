import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

import Header from '../../../components/Header'
import FormLabel from '../../../components/FormLabel'
import InputAutocomplete from '../../../components/InputAutocomplete'

// mocked data
import data from '../../../data/locations'
import data2 from '../../../data/ind'

const LineWrapper = ({ title = '', children}) => (
    <Grid container justify="center" alignItems="flex-start">
        <Grid item xs={12} md={4} lg={3} >
            <FormLabel>{title}</FormLabel>
        </Grid>
        <Grid item xs={12} md={8} lg={6} >
            {children}                    
        </Grid>
        <Grid item xs={12} md={12} lg={3} >
            {/* additions */}
        </Grid>
    </Grid>
)

const CandidateProfile = props => {
    const { details } = props
    const [info, setInfo] = useState(details)
    console.log('userInfo', info)

    const updateInfo = (path, data) => {
        const newInfo = {...info}
        if(path.length == 2) {
            newInfo[path[0]][path[1]]= data
        }
        if(path.length == 1) {
            newInfo[path[0]]= data
        }
        setInfo(newInfo)
    }

    return (
        <ValidatorForm>
            <Header />
            <Container>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={12} lg={10} >
                        <div>
                            <LineWrapper title='Job title'>
                                <TextField
                                    value={info.position}
                                    onChange={e => updateInfo(['position'], e.target.value)}
                                    id="position"
                                    type="input"
                                    placeholder="e.g. Senion Full-Stack Engineer"
                                />
                            </LineWrapper>
                            <LineWrapper title='Industries to search'>
                                <InputAutocomplete
                                    defaultValue={details.industries}
                                    returnValue={value => updateInfo(['industries'], value)}
                                    currentData={info.industries}
                                    data={data2}
                                />
                            </LineWrapper>
                            <LineWrapper title='Annual salary not lower than'>
                                <TextValidator
                                    id="annualSalary"
                                    value={info.annualSalary}
                                    type="number"
                                    onChange={e => updateInfo(['annualSalary'], e.target.value)}
                                    validators={['minNumber:0', 'matchRegexp:^[0-9]+$']}
                                    errorMessages={['min 0', 'do not match']}
                                />
                            </LineWrapper>
                            <LineWrapper title='Cities to search'>
                                <InputAutocomplete
                                    defaultValue={details.locations}
                                    returnValue={value => updateInfo(['locations'], value)}
                                    currentData={info.locations}
                                    data={data}
                                />
                            </LineWrapper>
                            <LineWrapper title='Skills'>
                                <InputAutocomplete
                                    defaultValue={details.skills}
                                    returnValue={value => updateInfo(['skills'], value)}
                                    currentData={info.skills}
                                    data={data}
                                />
                            </LineWrapper>
                            <LineWrapper title='Experience'>
                                <TextField
                                    id="filled-multiline-static"
                                    multiline
                                    value={info.additions.experience}
                                    onChange={e => updateInfo(['additions','experience'], e.target.value)}
                                />
                            </LineWrapper>
                            <LineWrapper title='Expectation'>
                                <TextField
                                    id="filled-multiline-static2"
                                    multiline
                                    value={info.additions.expectation}
                                    onChange={e => updateInfo(['additions','expectation'], e.target.value)}
                                />
                            </LineWrapper>
                            <LineWrapper title='Achivements'>
                                <TextField
                                    id="filled-multiline-static3"
                                    multiline
                                    value={info.additions.achivements}
                                    onChange={e => updateInfo(['additions','achivements'], e.target.value)}
                                />
                            </LineWrapper>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </ValidatorForm>
    )
}

export default CandidateProfile