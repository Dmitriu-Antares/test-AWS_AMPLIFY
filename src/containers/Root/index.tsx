import React, { Component } from 'react'

// component for isAuth 
class Root extends Component {
    componentDidMount() {
        console.log('root is here!')
    }

    render() {
        return (
            <div>
                someerrrr
                {this.props.children}
            </div>
        )
    }
}

export default Root
