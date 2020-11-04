import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { updateUserValue } from '../../../redux/reducers/auth'

import NavButtons from './NavButtons'
import FormLabel from '../../../components/FormLabel'

const Role = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding, roles } = props
    const [value, setValue] = useState(onboarding.role.length > 0 ? onboarding.role : roles[0].role);
    
    
    const handleChange = event => {
        setValue(event.target.value)
    }

    const handleNextStep = () => {
        dispatch(updateUserValue(value, 'role'))
        dispatch(updateUserValue([], 'specialities'))
        handleNext()
    }

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel>To which category is your job related?</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    {roles.map(({ role }) => (
                        <FormControlLabel value={role} key={role} control={<Radio />} label={role} />
                    ))}
                </RadioGroup>
            </FormControl>
            <NavButtons handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default Role