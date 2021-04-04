import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { notificationStyles } from '../styles';
import { TURN_OFF_NOTIFY } from '../actions/types';

function Notification() {

    const classes = notificationStyles();
    const notify = useSelector(state => state.scores.notify);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({
            type: TURN_OFF_NOTIFY
        });
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
