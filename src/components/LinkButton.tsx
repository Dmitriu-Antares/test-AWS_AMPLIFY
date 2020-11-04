import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.palette.common.white,
        textDecoration: 'none'
    },
}))

const LinkButton = props => {
    const { to, children, ...other } = props
    const s = useStyles()

    return (
        <Button variant="contained" color="primary" {...other}>
            <Link className={s.text} to={to}>
                {children}
            </Link>
        </Button>
    )
}

export default LinkButton