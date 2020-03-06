import { combineReducers } from 'redux';
import machines from './machineReducer';

const reducers = combineReducers({
  machines
});

export default reducers;
