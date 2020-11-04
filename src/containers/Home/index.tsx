import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../components/Header'
import isAuthed from '../../helpers'
// hook component example with redux
const Home = props => {
    const dispatch = useDispatch()
    useEffect(() => {
        if(isAuthed()) {
            props.history.push('/profile')
        }
    }, [])
    return (
        <div>
            <Header type='home'/>
            <p>Home</p>
        </div>
    )
}

export default Home