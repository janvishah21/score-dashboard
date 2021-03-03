import { pageContentStyles } from '../styles';
import Homepage from './Homepage';
import Leaderboard from './Leaderboard';
import Addscoreform from './Addscoreform';

function Pagecontent() {

    const classes = pageContentStyles();

    return (
        <div className={classes.root}>
            <Homepage />
            <Leaderboard />
            {/* <Addscoreform /> */}
        </div>
    )
}

export default Pagecontent
