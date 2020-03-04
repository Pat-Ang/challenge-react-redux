import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { getData } from '../actions';
import { connect } from 'react-redux';
import Health from '../components/Health';

const MachineTable = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  font-size: 20px;

  & > table {
    width: 100%;
  }

  & th {
    text-align: left;
    padding: 10px;
  }

  & tbody tr:nth-child(2n) {
    background-color: lightgray;
  }

  & td {
    border: 1px solid black;
    padding: 10px;

    & a {
      text-decoration: none;
    }
  }
`;

class Machines extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { data } = this.props;

    return (
      <MachineTable  data-testid="machines-component">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>IP Address</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
          {
            data.map((machine, key) => {
              return (
                <tr key={key}>
                  <td>
                    <Link to={`/machines/${machine.id}`}>
                      {machine.name}
                    </Link>
                  </td>
                  <td>{machine.ip_address}</td>
                  <td><Health machine={machine} hasTitle={false} /></td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </MachineTable>
    )
  }
}

Machines.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  data: state.machines.data
});

export default connect(mapStateToProps, { getData })(Machines);
