import { useState, useEffect } from 'react';
import { leaderboardStyles } from '../styles';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Tableutil } from './Tableutil';
import Pageheader from './Pageheader';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import Controls from './controls/Controls';
import SearchIcon from '@material-ui/icons/Search';
import { fetchScores, deleteScore, editScore } from '../api/api';
import { getGrade } from '../util';
import GradeSystem from './Gradesystem';
import Popup from './Popup';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from './Notification';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Addscoreform from './Addscoreform';
import { fetchAll, removeScore } from '../actions/scoreActions';
import { useSelector, useDispatch } from 'react-redux';

const headCells = [
    { id: 'roll_no', label: 'Roll No.' },
    { id: 'name', label: 'Name' },
    { id: 'maths_score', label: 'Maths Marks' },
    { id: 'physics_score', label: 'Physics Marks' },
    { id: 'chemistry_score', label: 'Chemistry Marks' },
    { id: 'total_score', label: 'Total Marks' },
    { id: 'percentage', label: 'Percentage Score' },
    { id: 'grade', label: 'Grade', disableSorting: true },
    { id: 'action', label: '', disableSorting: true }
]

function Leaderboard({ openPopup, setOpenPopup }) {

    const classes = leaderboardStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openFormPopup, setOpenFormPopup] = useState(false);
    const [scoreToEdit, setScoreToEdit] = useState(null);

    const scores = useSelector(state => state.scores.scores);
    const isLoading = useSelector(state => state.scores.isLoading);
    const notify = useSelector(state => state.scores.notify);
    const dispatch = useDispatch();

    useEffect( async () => {
        if(scores.length === 0)
            dispatch(fetchAll());
    }, []);

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
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => (x.name.toLowerCase().includes(target.value.toLowerCase()) || x.roll_no.includes(target.value.toLowerCase())));
            }
        })
    }

    const openFormInPopup = (score) => {

        setScoreToEdit(score);
        setOpenFormPopup(true);

    }

    return (
        <div>
            <Pageheader 
                title="Leaderboard"
                icon={<AssessmentOutlinedIcon fontSize="large" color="secondary" />} />

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
                        isLoading ?
                        <TableRow>
                            <TableCell colSpan="8" style={{textAlign: 'center'}}>
                                <CircularProgress size={60} color='secondary' />
                            </TableCell>
                        </TableRow> : 
                            recordsAfterPagingAndSorting().length !== 0 ?
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
                                        <TableCell>
                                            <Tooltip title="Edit Score">
                                                <IconButton onClick={() => {openFormInPopup(item)}}>
                                                    <EditIcon color='primary' />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Record">
                                                <IconButton onClick={() => {dispatch(removeScore(item.roll_no))}}>
                                                    <DeleteIcon color='secondary'/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>)
                                ) :
                                <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic' }} colSpan={headCells.length}>
                                            No Records Found
                                        </TableCell>
                                </TableRow>
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Notification />
            <Popup
                title="Grade System"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <GradeSystem />
            </Popup>
            <Popup
                openPopup={openFormPopup}
                setOpenPopup={setOpenFormPopup}
            >
                <Addscoreform
                    isEditing={true}
                    scoreForm={scoreToEdit}
                 />
            </Popup>
        </div>
    )
}

export default Leaderboard
