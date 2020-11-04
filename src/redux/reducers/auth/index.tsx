import { UPDATE_USER_DATA, SIGN_UP_USER, SIGN_UP_FAIL, REMOVE_AUTH_ERROR, LOGIN_USER, REMOVE_LOGIN_ERROR, LOGIN_FAIL } from './actionTypes'
import { signUpUser, logInUser } from '../../../api/index'
import { getProfileInfo } from '../profile'
import roles from '../../../data/role'

const initialState = {
    onboarding: {
        position: '', //n
        industries: [],
        locations: [], //n
        searchStatus: '',
        role: '',
        roleExp: 0,
        specialities: [],
        skills: [],
        options: [], //n
        remote: 'yes',
        annualSalary: 0,
        perHour: 0,
        educationType: 'degree',
        education: {
            university: '',
            field: '',
            degree: '',
            year: ''
        },
        jobs: [
            {
                name: '',
                position: '',
                startDate: new Date(),
                endDate: new Date(),
                skills: '',
                current: false
            }
        ],
        additions: {
            experience: '',
            expectation: '',
            achivements: ''
        }
    },
    roles,
    isAuthed: false,
    authError: null,
    loginError: null,
}

// store
export default (state = initialState, action)=> {
    switch(action.type){
        case UPDATE_USER_DATA:
            return {
                ...state,
                onboarding: action.onboarding,
            }
        case SIGN_UP_USER: 
            return {
                ...state,
                isAuthed: true,
                authError: null,
                role: action.role
            }
        case SIGN_UP_FAIL: 
            return {
                ...state,
                isAuthed: false,
                authError: action.authError
            }
        case REMOVE_AUTH_ERROR: 
            return {
                ...state,
                authError: null
            }
        case LOGIN_USER:
            return {
                ...state,
                isAuthed: true,
            }
        case REMOVE_LOGIN_ERROR:
            return {
                ...state,
                loginError: null
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthed: false,
                loginError: action.loginError
            }
        default: return state
    }
}

const updateOnboarding = onboarding => ({
    type: UPDATE_USER_DATA,
    onboarding
})

const signUpError = authError => ({
    type: SIGN_UP_FAIL,
    authError 
})

const loginError = loginError => ({
    type: LOGIN_FAIL,
    loginError
})

export const removeAuthError = () => ({
    type: REMOVE_AUTH_ERROR,
    authError: null
})

export const removeLoginError = () => ({
    type: REMOVE_LOGIN_ERROR,
    loginError: null
})

export function updateUserValue(value, key) {
    return (dispatch, getState) => {
        const onboarding = getState().authReducer.onboarding
        const newOnboarding = {...onboarding}
        newOnboarding[key] = value
        dispatch(updateOnboarding(newOnboarding))
    }
}

export function signUpAction(email, password, role, redirect) {
    return async dispatch => {
        try {
            dispatch(removeAuthError())
            const res = await signUpUser(email, password, role)
            console.log('token.data', res)
            localStorage.setItem('token', res.data.token);
            dispatch({type: SIGN_UP_USER})
            redirect(role === 'candidate')
        } catch (err) {
            console.log(err.response.data.error)
            dispatch(signUpError(err.response.data.error))
        }
        
    }
}

export function loginAction(email, password, redirect) {
    return async dispatch => {
        try {
            dispatch(removeLoginError())
            const { token, role } = await logInUser(email, password)
            localStorage.setItem('token', token);
            dispatch({type: LOGIN_USER, role})
            dispatch(getProfileInfo())
            redirect()
        } catch (err) {
            console.log(err.response.data.error)
            dispatch(loginError(err.response.data.error))
        }
        
    }
}
