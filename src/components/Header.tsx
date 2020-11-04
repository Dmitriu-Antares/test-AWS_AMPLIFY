import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import LinkButton from './LinkButton'

const useStyles = makeStyles((theme) => {
    console.log('theme', theme)
    return ({
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })
})

const Header = props => {
    const { type } = props
    const s = useStyles()

    return (
        <AppBar position="static" color="transparent">
            <Toolbar className={s.wrapper}>
                <Typography variant="h6" color="inherit">
                    Logo
                </Typography>
                {type === 'home' && (
                    <LinkButton to="/login">
                        <Typography>Log in</Typography>
                    </LinkButton>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header