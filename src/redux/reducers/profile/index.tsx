import { SET_ONBOARDING_SUCCESS, SET_ONBOARDING_ERROR, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR } from './actionTypes'
import { setOnboarding, getProfile } from '../../../api/index'

const initialState = {
    userRole: null,
    profileInfo: null,
    onboardingError: false,
    onboardingErrorText: ''
}

// store
export default (state = initialState, action)=> {
    switch(action.type){
        case SET_ONBOARDING_SUCCESS:
            return {
                ...state,
                onboardingError: false,
                onboardingErrorText: ''
            }
        case SET_ONBOARDING_ERROR:
            return {
                ...state,
                onboardingError: true,
                onboardingErrorText: action.error
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profileInfo: action.profileInfo,
                userRole: action.userRole
            }
        default: return state
    }
}

export function sendOnboarding(redirect) {
    return async (dispatch, getState) => {
        try {
            const onboarding = getState().authReducer.onboarding
            const res = await setOnboarding(onboarding)
            console.log('onb response', res)
            getProfileInfo()
            redirect()
        } catch (err) {
            console.log(err)
            dispatch({
                type: SET_ONBOARDING_ERROR,
                error: err.response.data.error
            })
        }
        
    }
}

export function getProfileInfo() {
    return async (dispatch) => {
        try {
            const { data: { userRole, details} } = await getProfile()
            console.log('success! loading profile...')
            dispatch({
                type: GET_PROFILE_SUCCESS,
                profileInfo: details,
                userRole
            })
        } catch(err) {
            console.log(err)
            //handle profile error
        }
    }
}