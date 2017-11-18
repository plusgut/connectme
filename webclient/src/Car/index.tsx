import * as React from 'react';
import Body from './Body';
import Door from './Door';
import props from './props';
import './car.css';

class Car extends React.Component<props> {
  render() {
    return (
      <span>
        <svg x="0px" y="0px" viewBox="0 0 841.9 595.3">
          <Body />
          <Door {...this.props} />
        </svg>
      </span>
    );
  }
}

export default Car;
