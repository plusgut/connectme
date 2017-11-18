import * as React from 'react';
import Car from './Car';
import Api from './Api';

interface props {}
interface state {
  apis: Api[];
}

class App extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      apis: [
        new Api(),
      ],
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.apis.map((api, index) =>
          <Car key={index} api={api} />,
        )}
      </div>
    );
  }
}

export default App;
