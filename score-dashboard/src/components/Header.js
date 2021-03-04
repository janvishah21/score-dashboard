import { headerStyles } from '../styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Controls from './controls/Controls';

function Header({ pageContentState, setPageContentState }) {

    const classes = headerStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}  onClick={() => {setPageContentState('home');}}>
                        Scoreboard
                    </Typography>
                    {   
                        pageContentState === 'lead' ?
                            <Controls.Button
                                variant="text"
                                size="large"
                                color="secondary"
                                endIcon={<AddCircleIcon />}
                                text="ADD SCORE"
                                onClick={() => {setPageContentState('add');}}>
                            </Controls.Button> :
                                pageContentState === 'add' ?
                                    <Controls.Button
                                        variant="text"
                                        size="large"
                                        color="secondary"
                                        endIcon={<AssessmentIcon />}
                                        text="VIEW LEADERBOARD"
                                        onClick={() => {setPageContentState('lead');}}>
                                    </Controls.Button> : ''
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
