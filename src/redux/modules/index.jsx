import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import userReducer from './userReducer';
import likeReducer from './likeReducer';


const rootReducer = combineReducers ({ boardReducer, userReducer, likeReducer });

export default rootReducer;
