import axios from 'axios';
import { API } from '../API';
import { LOADING, MACHINES_DATA, GET_MACHINE_BY_ID, UPDATE_MACHINE_NAME_BY_ID } from './actions';

const loading = () => ({ type: LOADING });

export const getData = () => dispatch => {
  dispatch(loading());
  axios
    .get(`${API}/machines`)
    .then(res => dispatch({
      type: MACHINES_DATA,
      payload: res.data
    }));
};

export const getMachineById = (id) => dispatch => {
  dispatch(loading());
  axios
    .get(`${API}/machines/${id}`)
    .then(res => dispatch({
      type: GET_MACHINE_BY_ID,
      payload: res.data
    }));
};

export const updateMachineNameById = (id, name) => dispatch => {
  dispatch(loading());
  axios
    .put(`${API}/machines/${id}`, { name })
    .then(res => dispatch({
      type: UPDATE_MACHINE_NAME_BY_ID,
      payload: res.data
    }));
};
