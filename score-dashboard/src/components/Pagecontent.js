import { pageContentStyles } from '../styles';
import Homepage from './Homepage';
import Leaderboard from './Leaderboard';
import Addscoreform from './Addscoreform';

function Pagecontent({ pageContentState, setPageContentState }) {

    const classes = pageContentStyles();

    return (
        <div className={classes.root}>
            { pageContentState === 'home' ? 
                <Homepage pageContentState={pageContentState} setPageContentState={setPageContentState} />
                :
                    pageContentState === 'add' ?
                        <Addscoreform />
                    :   <Leaderboard />
            }
        </div>
    )
}

export default Pagecontent
