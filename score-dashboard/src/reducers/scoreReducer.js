import { IN_PROGRESS, SCORES_FETCHED, SCORES_FETCH_FAIL, TURN_OFF_NOTIFY, SCORE_DELETED, SCORE_DELETE_FAIL, SCORE_CREATED, CREATE_SCORE_FAIL, SCORE_UPDATED, SCORE_UPDATE_FAIL } from '../actions/types';

const initialState = {
    notify: {
        isOpen: false,
        message: '',
        type: ''
    },
    isLoading: false,
    scores: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case IN_PROGRESS:
            return {
                ...state,
                isLoading: true
            }
        case SCORES_FETCHED:
            return {
                ...state,
                isLoading: false,
                scores: action.payload
            }
        case SCORES_FETCH_FAIL:
            return {
                ...state,
                isLoading: false,
                notify: {
                    isOpen: true,
                    message: 'Internal Server Error !',
                    type: 'error'
                }
            }
        case SCORE_CREATED:
            return {
                ...state,
                isLoading: false,
                scores: state.scores.concat(action.payload),
                notify: {
                    isOpen: true,
                    message: 'Submitted Successfully !',
                    type: 'success'
                }
            }
        case CREATE_SCORE_FAIL:
            return {
                ...state,
                isLoading: false,
                notify: {
                    isOpen: true,
                    message: action.error,
                    type: 'error'
                }
            }
        case SCORE_UPDATED:
            return {
                ...state,
                isLoading: false,
                scores: state.scores.map(score => score.roll_no === action.payload.roll_no ? action.payload : score),
                notify: {
                    isOpen: true,
                    message: 'Submitted Successfully !',
                    type: 'success'
                }
            }
        case SCORE_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
                notify: {
                    isOpen: true,
                    message: 'Internal Server Error !',
                    type: 'error'
                }
            }
        case SCORE_DELETED:
            return {
                ...state,
                scores: state.scores.filter(score => score.roll_no !== action.payload),
                notify: {
                    isOpen: true,
                    message: 'Deleted Successfully !',
                    type: 'success'
                }
            }
        case SCORE_DELETE_FAIL:
            return {
                ...state,
                notify: {
                    isOpen: true,
                    message: 'Internal Server Error !',
                    type: 'error'
                }
            }
        case TURN_OFF_NOTIFY:
            return {
                ...state,
                notify: {
                    ...state.notify,
                    isOpen: false
                }
            }
        default:
            return state;
    }
}