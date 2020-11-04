import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import data from '../../../data/locations'
import data2 from '../../../data/ind'

import NavButtons from './NavButtons'
import InputAutocomplete from '../../../components/InputAutocomplete'
import FormLabel from '../../../components/FormLabel'

import { updateUserValue } from '../../../redux/reducers/auth'
import { Typography } from '@material-ui/core'

const SearchStatus = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding } = props
    const [value, setValue] = useState(onboarding.searchStatus.length > 0 ? onboarding.searchStatus : 'ready');
    const [locations, setLocations] = useState(onboarding.locations)
    const [industries, setIndustries] = useState(onboarding.industries)
    const [position, setPosition] = useState(onboarding.position)
    
    const handleChange = event => {
        setValue(event.target.value)
    }
    
    const handleNextStep = () => {
        dispatch(updateUserValue(value, 'searchStatus'))
        dispatch(updateUserValue(position, 'position'))
        dispatch(updateUserValue(locations, 'locations'))
        dispatch(updateUserValue(industries, 'industries'))
        handleNext()
    }

    return (
        <div>
            <FormLabel>Desired position</FormLabel>
            <TextField
                value={position}
                onChange={e => setPosition(e.target.value)}
                id="position"
                type="input"
                placeholder="e.g. Senion Full-Stack Engineer"
            />
            <Box m={3} />
            <FormLabel>Desired industry to search</FormLabel>
            <Box m={1} />
            <InputAutocomplete
                returnValue={value => setIndustries(value)}
                defaultValue={onboarding.industries}
                currentData={industries}
                data={data2}/>
            <Box m={3} />
            <FormLabel sub='Type in, or choose from suggestions, up to 5'>Cities to search</FormLabel>
            <Box m={1} />
            <InputAutocomplete
                returnValue={value => setLocations(value)}
                defaultValue={onboarding.locations}
                currentData={locations}
                data={data}/>
            <Box m={3} />
            <FormControl component="fieldset">
                <FormLabel>Where are you in your job search?</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="ready" control={<Radio />} label="Actively searching" />
                    <FormControlLabel value="open" control={<Radio />} label="Casually looking " />
                    <FormControlLabel value="notLooking" control={<Radio />} label="Not currently looking" />
                </RadioGroup>
            </FormControl>
            <NavButtons first disableNext={position.length < 6} handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default SearchStatus