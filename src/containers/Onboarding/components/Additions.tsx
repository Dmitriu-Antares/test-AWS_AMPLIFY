import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'

import { updateUserValue } from '../../../redux/reducers/auth'
import { sendOnboarding } from '../../../redux/reducers/profile'

import NavButtons from './NavButtons'
import FormLabel from '../../../components/FormLabel'

const Additions = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding, roles } = props
    const [additions, setAdditions] = useState(onboarding.additions)

    const handleNextStep = () => {
        dispatch(updateUserValue(additions, 'additions'))
        dispatch(sendOnboarding(() => props.history.push('/profile')))
    }

    const changeAddition = (val, target) => {
        const newAdds = {...additions}
        newAdds[target] = val
        setAdditions(newAdds)
    }

    return (
        <div>
            <FormLabel>One more step... These questions are not obligatory, though they 
                will help employers to find out more about you</FormLabel> 
                <Box  m={1}/>
                <FormLabel sub='Please describe your experience in couple of sentences:'> </FormLabel> 
                <TextField
                    id="filled-multiline-static"
                    multiline
                    value={additions.experience}
                    onChange={e => changeAddition(e.target.value, 'experience')}
                />
                <Box  m={3}/>
                <FormLabel sub='What are your expectations from the future job:'> </FormLabel>
                <TextField
                    id="filled-multiline-static2"
                    multiline
                    value={additions.expectations}
                    onChange={e => changeAddition(e.target.value, 'expectation')}
                />
                <Box  m={3}/>
                <FormLabel sub='Your key achievements:'> </FormLabel>
                <TextField
                    id="filled-multiline-static3"
                    multiline
                    value={additions.achievements}
                    onChange={e => changeAddition(e.target.value, 'achivements')}
                />
            <NavButtons handleNextStep={handleNextStep} last handleBack={handleBack}/>
        </div> 
    )
}

export default Additions