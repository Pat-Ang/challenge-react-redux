import React from 'react';
import { render } from '@testing-library/react';

import Health from './Health';

const machine = {"id": "99ade105-dee1-49eb-8ac4-e4d272f89fba", "name": "Machine 1", "ip_address": "127.0.0.31", "health": 52};

let data = [];

describe('Health Component test', () => {
  test('component render', () => {
    const getMachineByIdMockFn = jest.fn();
    const { getByTestId } = render(<Health machine={machine} hasTitle={false} id={machine.id} />);
    const element = getByTestId('health-area');
    expect(element).toBeInTheDocument();
  });
})