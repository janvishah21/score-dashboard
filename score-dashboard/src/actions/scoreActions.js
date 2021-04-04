import { IN_PROGRESS, SCORES_FETCHED, SCORES_FETCH_FAIL, SCORE_DELETED, SCORE_DELETE_FAIL, SCORE_CREATED, CREATE_SCORE_FAIL, SCORE_UPDATED, SCORE_UPDATE_FAIL } from '../actions/types';
import { updateScores, getUpdatedScore } from '../util';
import { fetchScores, deleteScore, addScore, editScore } from '../api/api';

export const fetchAll = () => dispatch => {

    dispatch({
        type: IN_PROGRESS
    });
    fetchScores()
    .then(scores => dispatch({
        type: SCORES_FETCHED,
        payload: updateScores(scores)
    }))
    .catch(error => dispatch({
        type: SCORES_FETCH_FAIL
    }));

}

export const createScore = (score) => dispatch => {


    dispatch({
        type: IN_PROGRESS
    });
    addScore(score)
    .then(score => {
        if(!score.name)
            dispatch({
                type: CREATE_SCORE_FAIL,
                error: 'Record (Roll no.) Already Exists !'
            });
        else {
            dispatch({
                type: SCORE_CREATED,
                payload: getUpdatedScore(score)
            });
        }
    })
    .catch(error => dispatch({
        type: CREATE_SCORE_FAIL
    }));

}

export const updateScore = (score) => dispatch => {

    dispatch({
        type: IN_PROGRESS
    });
    editScore(score)
    .then(score => dispatch({
        type: SCORE_UPDATED,
        payload: getUpdatedScore(score)
    }))
    .catch(error => dispatch({
        type: SCORE_UPDATE_FAIL
    }));

}

export const removeScore = (roll_no) => dispatch => {

    deleteScore(roll_no)
    .then(score => {
        if(score.ok) {
            dispatch({
                type: SCORE_DELETED,
                payload: roll_no
            });
        } else {
            dispatch({
                type: SCORE_DELETE_FAIL
            });
        }
    })
    .catch(error => dispatch({
        type: SCORE_DELETE_FAIL
    }));

}
