import { combineReducers } from 'redux';
import ListReducer from './posts';

const rootReducer = combineReducers({
  list:ListReducer

});

export default rootReducer;
