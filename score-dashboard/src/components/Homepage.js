import Controls from './controls/Controls';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { homePageStyles } from '../styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Typography } from '@material-ui/core';

function Homepage({ pageContentState, setPageContentState }) {
    
    const classes = homePageStyles();

    return (
        <div className={classes.root}>
            <Typography
                variant="h2"
                component="div"
                color="primary">
                WELCOME</Typography>
            <br></br>
            <ButtonGroup color="secondary" size="large">
                <Controls.Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    endIcon={<AddCircleIcon />}
                    text="ADD SCORE"
                    onClick={() => {setPageContentState('add');}}>
                </Controls.Button>
                <Controls.Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    endIcon={<AssessmentIcon />}
                    text="VIEW LEADERBOARD"
                    onClick={() => {setPageContentState('lead');}}>
                </Controls.Button>
            </ButtonGroup>
        </div>
    )
}

export default Homepage
