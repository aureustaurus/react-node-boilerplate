import { combineReducers } from 'redux'
import shopsApp from './shops'

const rootReducer = combineReducers({
  shops: shopsApp
});

export default rootReducer;
