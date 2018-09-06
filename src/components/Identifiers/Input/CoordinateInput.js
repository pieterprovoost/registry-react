import React, { Component } from 'react';

class CoordinateInput extends Component {
  constructor(props) {
    super(props);

    this.setZero = this.setZero.bind(this);
    this.set200 = this.set200.bind(this);

    this.state = { value: props.value };
  }

  setZero = (e) => {
    this.props.onChange(this.props.name, [1, 2, 3], true);
  }

  set200 = (e) => {
    this.props.onChange(this.props.name, [4, 5, 600], true);
  }

  render() {
    return (
      <div>
          <a onClick={this.setZero}>Set to 0</a>
          <a onClick={this.set200}>Set to 200</a>
          <p>value: {this.state.value}</p>
          <p>{this.props.helperText}</p>
          {this.props.error && <p>'error'</p>}
      </div>
    );
  }
}

export default CoordinateInput;