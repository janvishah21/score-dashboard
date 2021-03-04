import { useState } from 'react';
import Pageheader from './Pageheader';
import AddIcon from '@material-ui/icons/Add';
import { Formutil, Form } from '../components/Formutil';
import Controls from '../components/controls/Controls';
import { Grid, Paper } from '@material-ui/core';
import { addScoreFormStyles } from '../styles';
import { addScore } from '../api/api';
import Notification from './Notification';
import { getGrade } from '../util';
import Popup from './Popup';
import GradeSystem from './Gradesystem';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function Addscoreform({ openPopup, setOpenPopup }) {

    const classes = addScoreFormStyles();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('roll_no' in fieldValues) {
            temp.roll_no = fieldValues.roll_no ? "" : "This field is required.";
            temp.roll_no = (/^[0-9]/).test(fieldValues.roll_no) ? "" : "Roll no. should be numeric string with 8 characters.";
            temp.roll_no = fieldValues.roll_no.length === 8 ? "" : "Roll no. should be numeric string with 8 characters.";
        }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required.";
        if ('maths_score' in fieldValues) {
            temp.maths_score = (fieldValues.maths_score >= 0 && fieldValues.maths_score <= 100) ? "" : "Marks should lie between 0 and 100";
        }
        if ('physics_score' in fieldValues) {
            temp.physics_score = (fieldValues.physics_score >= 0 && fieldValues.physics_score <= 100) ? "" : "Marks should lie between 0 and 100";
        }
        if ('chemistry_score' in fieldValues) {
            temp.chemistry_score = (fieldValues.chemistry_score >= 0 && fieldValues.chemistry_score <= 100) ? "" : "Marks should lie between 0 and 100";
        }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = Formutil(initialValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            console.log(values);
            const res = addScore(values);
            console.log(res);
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully !',
                type: 'success'
            });
            resetForm();
        }
    }

    return (
        <div className={classes.root}>
            <Pageheader 
                title="Add Score"
                icon={<AddIcon fontSize='large' />} />

            <Paper className={classes.formBody}>
                <Form onSubmit={handleSubmit}>
                    <Grid container style={{ textAlign: 'center' }}>
                        <Grid item xs={6}>
                            <Controls.Input
                                label="Roll No."
                                name="roll_no"
                                value={values.roll_no}
                                onChange={handleInputChange}
                                error={errors.roll_no}
                            />
                            <Controls.Input
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                error={errors.name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                <Controls.Input
                                    label="Maths Marks"
                                    name="maths_score"
                                    type="number"
                                    helperText="out of 100"
                                    value={values.maths_score}
                                    onChange={handleInputChange}
                                    error={errors.maths_score}
                                />
                                <Controls.Input
                                    label="Physics Marks"
                                    name="physics_score"
                                    type="number"
                                    helperText="out of 100"
                                    value={values.physics_score}
                                    onChange={handleInputChange}
                                    error={errors.physics_score}
                                />
                                <Controls.Input
                                    label="Chemistry Marks"
                                    name="chemistry_score"
                                    type="number"
                                    helperText="out of 100"
                                    value={values.chemistry_score}
                                    onChange={handleInputChange}
                                    error={errors.chemistry_score}
                                />
                            </div>
                        </Grid>
                        <Grid container style={{ margin: '20px 0px' }}>
                            <Grid item xs={6}>
                                <div className={classes.scoreContainer}>
                                    <span className={classes.label}>Total Marks : </span>
                                    <span className={classes.value}>{ +values.maths_score + +values.physics_score + +values.chemistry_score } </span>
                                    <br></br>
                                    <span className={classes.label}>Percentage Score : </span>
                                    <span className={classes.value}>{ Math.round((+values.maths_score + +values.physics_score + +values.chemistry_score) / 3 * 100) / 100 }</span>
                                    <br></br>
                                    <span className={classes.label}>Grade : </span>
                                    <span className={classes.value}>{ getGrade(Math.round((+values.maths_score + +values.physics_score + +values.chemistry_score) / 3 * 100) / 100) }</span>
                                    <Tooltip title='Grade System'>
                                        <IconButton onClick={() => {setOpenPopup(true)}} className={classes.infoIconButton}>
                                            <InfoIcon className={classes.infoIcon}/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <Controls.Button
                                    type="submit"
                                    text="Submit" />
                                &nbsp;&nbsp;&nbsp;
                                <Controls.Button
                                    text="Reset"
                                    color="default"
                                    onClick={resetForm} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
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
        </div>
    )
}

const initialValues = {
    roll_no: '',
    name: '',
    maths_score: 0,
    physics_score: 0,
    chemistry_score: 0
}

export default Addscoreform
