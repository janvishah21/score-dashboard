import { useState, useEffect } from 'react';
import { leaderboardStyles } from '../styles';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Tableutil } from './Tableutil';
import Pageheader from './Pageheader';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import Controls from './controls/Controls';
import SearchIcon from '@material-ui/icons/Search';
import { fetchScores, deleteScore } from '../api/api';
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
import { editScore } from '../api/api';

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
    const [scores, setScores] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [openFormPopup, setOpenFormPopup] = useState(false);
    const [scoreToEdit, setScoreToEdit] = useState(null);

    useEffect( async () => {
        getScores();
    }, []);

    const getScores = async () => {
        try {
            setIsLoading(true);
            const scores = await fetchScores();
            setScores(responseUpdate(scores));
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            setNotify({
                isOpen: true,
                message: 'Internal Server Error !',
                type: 'error'
            });
        }
    }

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

    const editRecord = async (values, resetForm, setIsLoading) => {
        try {
            setIsLoading(true);
            const res = await editScore(values);
            setIsLoading(false);
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully !',
                type: 'success'
            });
            resetForm();
            setScoreToEdit(null);
            setOpenFormPopup(false);
            getScores();
        } catch(error) {
            setIsLoading(false);
            setNotify({
                isOpen: true,
                message: 'Internal Server Error !',
                type: 'error'
            });
        }
    }

    const deleteRecord = async (roll_no) => {
        
        try {
            const res = await deleteScore(roll_no);
            if(!res.ok)
                throw new Error('Operation Unsuccessful !');
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully !',
                type: 'success'
            });
            getScores();
        } catch(error) {
            setNotify({
                isOpen: true,
                message: 'Internal Server Error !',
                type: 'error'
            });
        }

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
                                                <IconButton onClick={() => {deleteRecord(item.roll_no)}}>
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
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
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
                    editScore={editRecord}
                    isEditing={true}
                    scoreForm={scoreToEdit}
                 />
            </Popup>
        </div>
    )
}

export default Leaderboard
