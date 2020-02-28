import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import { WEBSOCKET } from '../API';

const healthStyles = css`
  width: 100%;
  padding: ${props => props.hasTitle ? 10 : 0}px;
  border: ${props => props.hasTitle ? '1px solid black' : 'none'};
  background-color: ${props => props.hasTitle ? 'lightgray' : 0};

  & h1 {
    text-align: center;
    margin: 10px 0;
  }
`;

const HealthArea = styled.div`
  ${healthStyles}
`;

const HealthPercent = styled.div`
  margin: 0 auto;
  border: 1px solid black;
  width: 90%;
  height: 30px;
  background: white;
`;

const Percent = styled.div`
  width: ${props => props.bgArea ? props.bgArea : 0}%;
  background-color: ${props => props.bgArea > 70 ? '#5cb85c' : props.bgArea > 50 ? '#f0ad4e' : '#d9534f'};
  height: 100%;
`;

class Health extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      health: 0
    };
  }

  ws = new WebSocket(WEBSOCKET);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected');
    }

    this.ws.onmessage = evt => {
      const { id, health } = JSON.parse(evt.data);
      // console.log(this.props.machine.id);
      if(this.props.machine.id === id) {
        this.setState({ health });
      }
    }

    this.ws.onclose = () => {
      console.log('disconnected');
    }
  }

  render() {
    const { hasTitle } = this.props;
    const { health } = this.state;

    return (
      <HealthArea hasTitle={hasTitle} data-testid='health-area'>
        {hasTitle &&
          <h1>{health}</h1>
        }
        <HealthPercent>
          <Percent bgArea={health}/>
        </HealthPercent>
      </HealthArea>
    )
  }
}

Health.propTypes = {
  id: PropTypes.string.isRequired,
  machine: PropTypes.object,
  hasTitle: PropTypes.bool.isRequired
}

export default Health;
