import { useState, useEffect } from 'react';
import { leaderboardStyles } from '../styles';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Tableutil } from './Tableutil';
import Pageheader from './Pageheader';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import Controls from './controls/Controls';
import SearchIcon from '@material-ui/icons/Search';
import { fetchScores } from '../api/api';
import { getGrade } from '../util';
import GradeSystem from './Gradesystem';
import Popup from './Popup';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const headCells = [
    { id: 'roll_no', label: 'Roll No.' },
    { id: 'name', label: 'Name' },
    { id: 'maths_score', label: 'Maths Marks' },
    { id: 'physics_score', label: 'Physics Marks' },
    { id: 'chemistry_score', label: 'Chemistry Marks' },
    { id: 'total_score', label: 'Total Marks' },
    { id: 'percentage', label: 'Percentage Score' },
    { id: 'grade', label: 'Grade' },
]

function Leaderboard({ openPopup, setOpenPopup }) {

    const classes = leaderboardStyles();
    const [scores, setScores] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });

    useEffect(() => {

        const getScores = async () => {
          const scores = await fetchScores();
          setScores(responseUpdate(scores));
        }
    
        getScores();
    
    }, []);

    const responseUpdate = (scores) => {
        scores.map((score) => {
            score.total_score = score.maths_score + score.physics_score + score.chemistry_score;
            score.percentage = Math.round(( score.total_score) / 3 * 100) / 100;
            score.grade = getGrade(score.percentage);
            return score;
        });
        return scores;
    } 

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tableutil(scores, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => (x.name.toLowerCase().includes(target.value.toLowerCase()) || x.roll_no.includes(target.value.toLowerCase())));
            }
        })
    }

    return (
        <div>
            <Pageheader 
                title="Leaderboard"
                icon={<AssessmentOutlinedIcon fontSize="large" />} />

            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Student"
                        variant="standard"
                        helperText="by Name and Roll no."
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    <div style={{ flex: 1 }}></div>
                    <Tooltip title='Grade System'>
                        <IconButton onClick={() => {setOpenPopup(true)}}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            scores.length !== 0 ?
                                recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.roll_no}>
                                        <TableCell style={{ fontWeight: 'bold' }}>{item.roll_no}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.maths_score}</TableCell>
                                        <TableCell>{item.physics_score}</TableCell>
                                        <TableCell>{item.chemistry_score}</TableCell>
                                        <TableCell>{item.total_score}</TableCell>
                                        <TableCell>{item.percentage}</TableCell>
                                        <TableCell 
                                            style={{ 
                                                fontWeight: 'bold',
                                            }}>
                                            {item.grade}
                                        </TableCell>
                                    </TableRow>)
                                ) :
                                <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic' }} colSpan="7">
                                            No Records Found
                                        </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Grade System"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <GradeSystem />
            </Popup>
        </div>
    )
}

export default Leaderboard
