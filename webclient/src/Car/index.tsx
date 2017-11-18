import * as React from 'react';

interface props {
  openDoor: boolean;
  openTrunk: boolean;
  setOpenDoor: () => void;
  setCloseDoor: () => void;
}

class Car extends React.Component<props> {
  render() {
    return (
      <span>
        {this.props.openDoor ? 'open' : 'closed'}
        
        <span>{this.props.openTrunk}</span>
        foo
      </span>
    );
  }
}

export default Car;
