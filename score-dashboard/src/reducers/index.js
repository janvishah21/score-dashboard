import { combineReducers } from 'redux';
import scoreReducer from './scoreReducer';

export default combineReducers({
    scores: scoreReducer
});