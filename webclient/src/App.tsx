import * as React from 'react';
import Car from './Car';
import api from './api';

interface props {}
interface state {
  openDoor: boolean;
  openTrunk: boolean;
}

class App extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      openDoor: false,
      openTrunk: false,
    };

    this.getDoorState();
  }

  private getDoorState() {
    api.getDoor().then((openDoor: boolean) => {
      this.setState({
        openDoor,
        // openDoor: true,
      });
    });
  }

  private setOpenDoor() {
    api.setOpenDoor();
    this.setState({
      openDoor: true,
    });
  }

  private setCloseDoor() {
    api.setCloseDoor();
    this.setState({
      openDoor: false,
    });
  }

  render() {
    return (
      <div className="App">
        <Car 
          openDoor={this.state.openDoor}
          openTrunk={this.state.openTrunk}
          setOpenDoor={() => this.setOpenDoor()}
          setCloseDoor={() => this.setCloseDoor()}
        />
      </div>
    );
  }
}

export default App;
