import React from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { counterAdd, counterReset } from '../../redux/reducers/counter';

// hook component example with redux
const Home = (props) => {
    const { counter, error } = useSelector(state => state.counterReducer)
    const dispatch = useDispatch()

    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <p>Home</p>
            <p>counter {counter}</p>
            {error !== null && <p>{error}</p>}
            <p onClick={() => dispatch(counterAdd())}>Tap to add</p>
            <p onClick={() => dispatch(counterReset())}>Tap to reset</p>
        </div>
    )
}

export default Home