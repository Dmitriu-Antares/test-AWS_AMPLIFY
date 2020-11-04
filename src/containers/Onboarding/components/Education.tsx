import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import { updateUserValue } from '../../../redux/reducers/auth'
import FormLabel from '../../../components/FormLabel'

import NavButtons from './NavButtons'

const Education = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding, roles } = props
    const [educationType, setEducationType] = useState(onboarding.educationType)
    const [year, setYear] = useState(onboarding.education.year)
    const [university, setUniversity] = useState(onboarding.education.university)
    const [field, setField] = useState(onboarding.education.field)
    const [degree, setDegree] = useState(onboarding.education.degree)

    const handleNextStep = () => {
        dispatch(updateUserValue(educationType, 'educationType'))
        if(educationType === 'degree') {
            dispatch(updateUserValue({
                university,
                field,
                degree,
                year
            }, 'education'))
        } else {
            dispatch(updateUserValue({
                university: '',
                field: '',
                degree: '',
                year: ''
            }, 'education'))
        }
        //
        handleNext()
    }
    let disableNext = false
    if(educationType === 'self') {
        disableNext = false
    } else {
        if(university.length < 1 || year.length < 3 || field.length < 1 || degree.length < 1) {
            disableNext = true
        }
    }

    return (
        <div>
            <FormLabel>Enter your education</FormLabel>
            <FormControl component="fieldset">
                <RadioGroup aria-label="education" name="education" value={educationType} onChange={e => setEducationType(e.target.value)}>
                    <FormControlLabel value="degree" control={<Radio />} label="I have professional degree(s) or have completed a bootcamp." />
                    <FormControlLabel value="self" control={<Radio />} label="I am self-taught" />
                </RadioGroup>
            </FormControl>
            {educationType === 'degree' && (
                <div>
                    <Box m={4} />
                    <FormLabel>Where were you educated?</FormLabel>
                    <TextField id="univercity" label="University/Bootcamp" value={university} onChange={e => setUniversity(e.target.value)}/>
                    <Box m={2} />
                    <TextField id="field" label="Field" value={field} onChange={e => setField(e.target.value)}/>
                    <Box m={2} />
                    <TextField id="degree" label="Degree/Specialization" value={degree} onChange={e => setDegree(e.target.value)}/>
                    <Box m={2} />
                    <TextField id="grad" type="number" label="Year of graduation:" value={year} onChange={e => setYear(e.target.value)}/>
                </div>
            )}
            <NavButtons disableNext={disableNext} handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default Education