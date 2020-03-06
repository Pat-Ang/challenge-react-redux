import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getMachineById, updateMachineNameById } from '../actions';
import Health from '../components/Health';

const MachineDetail = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  margin: 0 auto;

  & > div {
    width: 50%;

    & input[type=text] {
      width: 100%;
    }

    :first-child {
      margin-right: 50px;
    }
  }

  & input[type=submit] {
    float: right;
    margin-top: 10px;
    background-color: gray;
    color: white;
  }
`;

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      name: '',
      machineId: window.location.pathname.split('machines/')[1]
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getMachineById(this.state.machineId);
  }

  handleChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateMachineNameById(this.state.machineId, this.state.name);
  }

  render() {
    const { data } = this.props;

    return (
      <MachineDetail data-testid="detailpage-component">
        <div>
          <h1>{data.name}</h1>
          <h2>Update Device</h2>
          <label>Name:</label>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder={data.name} name="name" onChange={this.handleChange} value={this.state.name} />
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
        <div>
          <Health machine={data} hasTitle />
          <h2>Stats</h2>
          <label>IP Address: {data.ip_address}</label>
        </div>
      </MachineDetail>
    );
  }
}

const mapStateToProps = state => ({
  data: state.machines.selectedMachine
});

DetailPage.propTypes = {
  getMachineById: PropTypes.func.isRequired,
  updateMachineNameById: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getMachineById, updateMachineNameById })(DetailPage);
