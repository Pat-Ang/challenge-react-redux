import React from 'react';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';

import Machines from './Machines';

const middleware = [thunk];
const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(...middleware));

let machines = [];

describe('Machines Component Test', () => {
  test('component render', () => {
    const getMachinesMockFn = jest.fn();
    const { getByTestId } = render(<Provider store={store}><Machines getData={getMachinesMockFn} data={machines} /></Provider>);
    const element = getByTestId('machines-component');
    expect(element).toBeInTheDocument();
  });
});