import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import data from '../../../data/skills'
import InputAutocomplete from '../../../components/InputAutocomplete'
import FormLabel from '../../../components/FormLabel'

import { updateUserValue } from '../../../redux/reducers/auth'

import NavButtons from './NavButtons'

const Skills = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding, roles } = props
    const [skills, setSkills] = useState(onboarding.skills)

    const handleNextStep = () => {
        dispatch(updateUserValue(skills, 'skills'))
        handleNext()
    }

    return (
        <div>
            <FormLabel sub='Choose up to 5 skills'>What are your key skills in {onboarding.role}</FormLabel>
            <InputAutocomplete
                returnValue={value => setSkills(value)}
                defaultValue={onboarding.skills}
                currentData={skills}
                data={data}/>
            <NavButtons handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default Skills