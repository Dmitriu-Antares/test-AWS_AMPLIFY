import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox';

import FormLabel from '../../../components/FormLabel'

import { updateUserValue } from '../../../redux/reducers/auth'

import NavButtons from './NavButtons'

const optionsMock = [
    'Full-time',
    'Part-time',
    'Contract positions',
    'Ready to relocate',
    'Internship'
]

const Options = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding, roles } = props
    const [remote, setRemote] = useState(onboarding.remote)
    const [options, setOptions] = useState(onboarding.options)

    const handleNextStep = () => {
        dispatch(updateUserValue(options, 'options'))
        dispatch(updateUserValue(remote, 'remote'))
        handleNext()
    }

    const handleChange = e => {
        const val = e.target.value
        const newOptions = [...options]
        if(newOptions.includes(val)) {
            newOptions.splice(newOptions.indexOf(val), 1);
        } else {
            newOptions.push(val)
        }
        console.log(newOptions)
        setOptions(newOptions)
    }

    let disableNext = true
    if(options.includes('Part-time') || options.includes('Full-time') || options.includes('Contract positions')) {
        disableNext = false
    }
    return (
        <div>
            <FormLabel>In which employment options are you interested?</FormLabel>
            <FormControl component="fieldset">
                <FormGroup>
                    {optionsMock.map(option => (
                        <FormControlLabel
                            key={option}
                            control={<Checkbox checked={options.includes(option)} onChange={handleChange} name={option} />}
                            label={option}
                            value={option}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <Box m={3} />
            <FormLabel>Are you ready to work remotely?</FormLabel>
            <FormControl component="fieldset">
                <RadioGroup aria-label="remote" name="reemote1" value={remote} onChange={e => setRemote(e.target.value)}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="only" control={<Radio />} label="Remote only" />
                </RadioGroup>
            </FormControl>
            <NavButtons disableNext={disableNext} handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default Options