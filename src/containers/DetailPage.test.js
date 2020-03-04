import React from 'react';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';

import DetailPage from './DetailPage';

const middleware = [thunk];
const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(...middleware));

let data = {id:'', name: '', ip_address: '', health: 0};

describe('DetailPage Component Test', () => {
  test('component render', () => {
    const getMachineByIdMockFn = jest.fn();
    const updateMachineByIdMockFn = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <DetailPage updateMachineById={updateMachineByIdMockFn} getMachineById={getMachineByIdMockFn} data={data} />
      </Provider>
    );
    const element = getByTestId('detailpage-component');
    expect(element).toBeInTheDocument();
  });
});