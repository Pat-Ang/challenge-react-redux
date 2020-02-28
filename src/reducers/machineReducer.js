import { LOADING, MACHINES_DATA, GET_MACHINE_BY_ID, UPDATE_MACHINE_NAME_BY_ID } from '../actions/actions';

const initialState = {
  data: [],
  loading: false,
  selectedMachine: {}
};

export default function machines(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case MACHINES_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case GET_MACHINE_BY_ID:
      return {
        ...state,
        selectedMachine: action.payload,
        loading: false
      }
    case UPDATE_MACHINE_NAME_BY_ID:
      return {
        ...state,
        selectedMachine: action.payload,
        loading: false
      }
    default:
      return state;
  }
}