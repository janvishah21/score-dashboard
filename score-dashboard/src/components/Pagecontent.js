import { useState } from 'react';
import { pageContentStyles } from '../styles';
import Homepage from './Homepage';
import Leaderboard from './Leaderboard';
import Addscoreform from './Addscoreform';

function Pagecontent({ pageContentState, setPageContentState }) {

    const classes = pageContentStyles();
    const [openPopup, setOpenPopup] = useState(false);
    
    return (
        <div className={classes.root}>
            { pageContentState === 'home' ? 
                <Homepage pageContentState={pageContentState} setPageContentState={setPageContentState} />
                :
                    pageContentState === 'add' ?
                        <Addscoreform openPopup={openPopup} setOpenPopup={setOpenPopup} />
                    :   <Leaderboard openPopup={openPopup} setOpenPopup={setOpenPopup} />
            }
        </div>
    )
}

export default Pagecontent
