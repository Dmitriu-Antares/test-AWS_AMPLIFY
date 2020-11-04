import { combineReducers } from 'redux'
import authReducer from './reducers/auth'
import profileReducer from './reducers/profile'

export default combineReducers({
    authReducer,
    profileReducer
})