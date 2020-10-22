import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { counterAdd, counterReset } from '../../redux/reducers/counter';

// class component example with redux
class Login extends Component<any, {}> {
    render() {
        const { counter, error, onAdd, onReset } = this.props;
        return (
            <div>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <p>Login</p>
                <p>counter {counter}</p>
                {error !== null && <p>{error}</p>}
                <p onClick={() => onAdd()}>Tap to add</p>
                <p onClick={() => onReset()}>Tap to reset</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      counter: state.counterReducer.counter,
      error: state.counterReducer.error
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: () => dispatch(counterAdd()),
        onReset: () => dispatch(counterReset())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)