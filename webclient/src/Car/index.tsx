import * as React from 'react';
import Api from '../Api';
import Body from './Body';
import Door from './Door';
import './car.css';

const POLL_TIME = 800;

interface props {
  api: Api;
}

interface state {
  openDoor: boolean;
  openTrunk: boolean;
}

class Car extends React.Component<props, state> {

  constructor(props: props) {
    super(props);
    this.state = {
      openDoor: false,
      openTrunk: false,
    };

    this.getDoorState();
  }

  private getDoorState() {
    this.props.api.getDoor().then((openDoor: boolean) => {
      this.setState({
        openDoor,
        // openDoor: true,
      });
      setTimeout(this.getDoorState.bind(this), POLL_TIME);
    });
  }

  private setOpenDoor() {
    this.props.api.setOpenDoor();
    this.setState({
      openDoor: true,
    });
  }

  private setCloseDoor() {
    this.props.api.setCloseDoor();
    this.setState({
      openDoor: false,
    });
  }

  render() {
    return (
      <span>
        <svg x="0px" y="0px" viewBox="0 0 841.9 595.3">
          <Body />
          <Door
            openDoor={this.state.openDoor}
            openTrunk={this.state.openTrunk}
            setOpenDoor={this.setOpenDoor.bind(this)}
            setCloseDoor={this.setCloseDoor.bind(this)}
          />
        </svg>
      </span>
    );
  }
}

export default Car;
