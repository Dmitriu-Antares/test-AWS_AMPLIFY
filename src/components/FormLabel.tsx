import React, {Fragment} from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const FormLabel = ({ children, sub = '', ...props}) => (
    <Fragment>
        <Typography variant='h6' color='textPrimary' {...props}>
            {children}
        </Typography>
        {sub.length > 0 && (
            <Typography variant='caption' color='textSecondary'>
                {sub}
            </Typography>
        )}
        <Box m={1} />
    </Fragment>
)
export default FormLabel