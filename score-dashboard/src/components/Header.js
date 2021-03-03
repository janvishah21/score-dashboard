import { headerStyles } from '../styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function Header() {

    const classes = headerStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Scoreboard
                    </Typography>
                    <IconButton aria-label="Add Score" color="inherit">
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton aria-label="View Leaderboard" color="inherit">
                        <AssessmentIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
