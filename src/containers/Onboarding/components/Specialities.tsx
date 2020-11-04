import React, {useState} from 'react'
import { useDispatch } from 'react-redux'


import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { updateUserValue } from '../../../redux/reducers/auth'

import NavButtons from './NavButtons'
import FormLabel from '../../../components/FormLabel'


const Role = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding, roles } = props

    const handleState = () => {
        if(onboarding.specialities.length === 0) {
            let stateSpecs = {}
            const currentRole = roles.filter(item => item.role === onboarding.role)
            currentRole[0].specialities.forEach(spec => stateSpecs[spec] = false)
            return stateSpecs
        } else {
            let stateSpecs = {}
            const currentRole = roles.filter(item => item.role === onboarding.role)
            currentRole[0].specialities.forEach(spec => stateSpecs[spec] = false)
            onboarding.specialities.forEach(spec => stateSpecs[spec.speciality] = true )
            return stateSpecs
        }
        return {}
    }

    const [values, setValues] = useState(handleState());
    const specKeys = Object.keys(values)
    const filterChecked = specKeys.filter(key => values[key])
    const error = filterChecked.length > 3
    const noValues = filterChecked.length === 0
    
    const handleChange = (event) => setValues({ ...values, [event.target.name]: event.target.checked })

    const handleNextStep = () => {
        dispatch(updateUserValue(filterChecked.map(item => {
            const alreadySaved = onboarding.specialities.filter(spec => spec.speciality === item)
            return ({speciality: item, experience: alreadySaved.length > 0 ? alreadySaved[0].experience : 0})
        }), 'specialities'))
        handleNext()
    }
    let counter = 0
    specKeys.forEach(key => {
        if(values[key]) counter++
    })
    return (
        <div>
            <FormControl component="fieldset" error={error}>
                <FormLabel sub='Choose up to 3'>What are your specialties?</FormLabel>
                <FormGroup>
                    {specKeys.map(key => (
                        <FormControlLabel
                            key={key}
                            disabled={!values[key] && counter === 3}
                            control={<Checkbox checked={values[key]} onChange={handleChange} name={key} />}
                            label={key}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <NavButtons disableNext={error || noValues} handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default Role