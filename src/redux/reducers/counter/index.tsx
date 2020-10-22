import {
    COUNTER_ADD_SUCCESS,
    COUNTER_ADD_ERROR,
    COUNTER_RESET
} from './actionTypes'

const initialState = {
    counter: 1,
    error: false
}

// store
export default (state = initialState, action)=> {
    switch(action.type){
        case COUNTER_ADD_SUCCESS:
            return {
                counter: action.counter,
                error: action.error
            }
        case COUNTER_ADD_ERROR:
            return {
                counter: action.counter,
                error: action.error
            }
        case COUNTER_RESET:
            return initialState
        default: return state
    }
}

// pure action
const counterSuccess = newCounter => ({
    type: COUNTER_ADD_SUCCESS,
    counter: newCounter,
    error: null
})

const counterError = () => ({
    type: COUNTER_ADD_ERROR,
    counter: '---',
    error: 'Counter is too big'
})

// thunk middleware handling
export function counterAdd() {
    return (dispatch, getState) => {
        const { counter } = getState().counterReducer
        let newCounter = counter + 1

        if(newCounter < 3) {
            return dispatch(counterSuccess(newCounter))
        } else {
            return dispatch(counterError())
        }
    }
}

// mixed pure action + thunk
export const counterReset = () => dispatch => dispatch({type: COUNTER_RESET})