import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl'
import DateFnsUtils from '@date-io/date-fns'

import NavButtons from './NavButtons'
import FormLabel from '../../../components/FormLabel'
import { updateUserValue } from '../../../redux/reducers/auth'
import { datesCompare } from '../../../helpers'

const Jobs = props => {
    const dispatch = useDispatch()
    const { handleNext, handleBack, onboarding } = props
    const [jobs, setJobs] = useState(onboarding.jobs)
    
    const mutateJobsAnswer = (jobsArr) => jobsArr.filter(job => {
        if(job.name.length > 2 || job.position.length > 4) {
            if(job.current) {
                return true
            }
            if(datesCompare.compare(job.endDate, job.startDate) === 1) {
                return true
            }
        }
        return false
    })

    const handleNextStep = () => {
        dispatch(updateUserValue(mutateJobsAnswer(jobs), 'jobs'))
        handleNext()
    }

    const handleValue = (val, target, index) => {
        const newJobs = [...jobs]
        newJobs[index][target] = val
        setJobs(newJobs)
    }

    const addNewJob = () => {
        const newJobs = [...jobs]
        newJobs.push(
            {
                name: '',
                position: '',
                startDate: new Date(),
                endDate: new Date(),
                skills: '',
                current: false
            }
        )
        setJobs(newJobs)
    }
    console.log('updated', jobs)
    return (
        <div>
            <FormLabel
                sub="All info will be anonymized and won't be shared without your consent."
            >Enter your work experience</FormLabel>
            {jobs.map((job, i) => {
                const compare = datesCompare.compare(job.endDate, job.startDate)
                return (
                    <div key={`newJob-${i}`}>
                        <TextField id="name" label="Company Name" value={job.name } onChange={e => handleValue(e.target.value, 'name', i)}/>
                        <Box  m={1}/>
                        <TextField id="position" label="Position" value={job.position} onChange={e => handleValue(e.target.value, 'position', i)}/>
                        <Box  m={1}/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="StartDate"
                                value={job.startDate}
                                onChange={e => handleValue(e, 'startDate', i)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <Box  m={1}/>
                            <FormControl component="fieldset">
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={job.current}
                                        onChange={e => handleValue(!job.current, 'current', i)}
                                        name="current"
                                    />
                                    }
                                    label="Current"
                                />
                            </FormControl>
                            <Box  m={1}/>
                            {!job.current && <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="EndDate"
                                value={job.endDate}
                                error={compare !== 1}
                                helperText={compare !== 1 ? 'EndDate need to be bigger then startDate' : ''}
                                onChange={e => handleValue(e, 'endDate', i)} 
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />}
                        </MuiPickersUtilsProvider>
                    </div>
                )
            })}
            <Button onClick={addNewJob}>+ add more experience</Button>
            <NavButtons handleNextStep={handleNextStep} handleBack={handleBack}/>
        </div> 
    )
}

export default Jobs