import React, {useState} from 'react'
import { useDispatch } from 'react-redux'


import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Slider from '@material-ui/core/Slider';

import { updateUserValue } from '../../../redux/reducers/auth'

import NavButtons from './NavButtons'
import FormLabel from '../../../components/FormLabel';

const marks = [
    {
        value: 0,
        label: '<1',
    },
    {
        value: 1,
        label: '1-2',
    },
    {
        value: 2,
        label: '3-4',
    },
    {
        value: 3,
        label: '5-6',
    },
    {
        value: 4,
        label: '7-8',
    },
    {
        value: 5,
        label: '8-10',
    },
    {
        value: 6,
        label: '10+',
    },
  ];

const Duration = props => {
    console.log('duration', props)
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding: { role, roleExp , specialities }, roles } = props

    const [roleExpS, setRoleExpS] = useState(roleExp)
    const [specsExp, setSpecsExp] = useState(specialities)
    
    const handleChangeInSpec = (num, i) => {
        if(specsExp[i].experience !== num) {
            const newSpecsExp = [...specsExp]
            newSpecsExp[i].experience = num
            console.log('new spex exp', newSpecsExp)
            setSpecsExp(newSpecsExp)
        }
    }

    const handleNextStep = () => {
        dispatch(updateUserValue(specsExp, 'specialities'))
        dispatch(updateUserValue(roleExpS, 'roleExp'))
        handleNext()
    }

    //console.log('duration', onboarding)

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel sub='Set up the number of years'>How long have been in {role}</FormLabel>
                <Slider
                    defaultValue={roleExp}
                    getAriaValueText={(a, i) => {
                        setRoleExpS(a)
                        return ''
                    }}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    min={0}
                    max={6}
                />
                {specialities.map((spec, i) => (
                    <div>
                        <br />
                        <FormLabel component="legend">How long have been in {spec.speciality}</FormLabel>
                        <FormHelperText>Set up the number of years</FormHelperText>
                        <Slider
                            defaultValue={spec.experience}
                            getAriaValueText={num => {
                                //setRoleExpS(a)
                                handleChangeInSpec(num, i)
                                return ''
                            }}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            min={0}
                            max={6}
                        />
                    </div>
                ))}
            </FormControl>
            <NavButtons handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default Duration