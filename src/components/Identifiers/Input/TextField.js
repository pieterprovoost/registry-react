import React, { Component } from 'react';
import TextInput from '@material-ui/core/TextField';

class TextField extends Component {
  render() {
    const { name } = this.props;
    return (
      <TextInput
        name={name}
        label={this.props.label}
        value={this.props.values[name]}
        margin="normal"
        error={this.props.errors[name] && this.props.touched[name]}
        helperText={this.props.errors[name]}
        onChange={this.props.handleChange}
        onBlur={this.props.handleBlur}
      />
    );
  }
}

export default TextField;