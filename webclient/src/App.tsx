import * as React from 'react';
import Car from './Car';
import api from './api';

interface props {};
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
        openDoor: openDoor
      });
    });
  }

  private setOpenDoor() {
    api.setOpenDoor();
  }

  private setCloseDoor() {
    api.setCloseDoor();
  }

  render() {
    return (
      <div className="App">
        <Car 
          openDoor={true}
          openTrunk={false}
          setOpenDoor={() => this.setOpenDoor()}
          setCloseDoor={() => this.setCloseDoor()}
        />
      </div>
    );
  }
}

export default App;
