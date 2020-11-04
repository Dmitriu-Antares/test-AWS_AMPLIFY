import React from 'react'

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'

const NavButtons = props => {
    const { last = false, first = false, disableNext = false, handleBack, handleNextStep } = props
    return (
        <div>
            <Box m={4} />
            {!first && (
                <Button
                    disabled={first}
                    onClick={handleBack}
                >
                    Back
                </Button>
            )}
            {last ? (
                <Button disabled={disableNext} variant="contained" color="primary" onClick={handleNextStep}>
                    Finish
                </Button>
            ) : (
                <Button disabled={disableNext} variant="contained" color="primary" onClick={handleNextStep}>
                    Next
                </Button>
            )}
            
        </div> 
    )
}

export default NavButtons