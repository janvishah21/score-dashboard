
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { footerStyles } from '../styles';

function Footer() {

    const classes = footerStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="body1" color="inherit" className={classes.label}>
                        developed by Janvi Milan Shah
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Footer
