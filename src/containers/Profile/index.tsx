import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CandidateProfile from './components/CandidateProfile'
import RecruiterProfile from './components/RecruiterProfile'

import { getProfile } from '../../api'

const Profile = props => {
    const role = useSelector(state => state.profileReducer.userRole)
    const profileInfo = useSelector(state => state.profileReducer.profileInfo)
    
    if(role === null) {
        return <p>Loading</p>
    }
    return role === 'candidate' ? <CandidateProfile details={profileInfo} /> : <RecruiterProfile />
}

export default Profile