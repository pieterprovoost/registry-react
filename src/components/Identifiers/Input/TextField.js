import React, { Component } from 'react';
import TextInput from '@material-ui/core/TextField';

class TextField extends Component {
  render() {
    const { name } = this.props;
    let showError = this.props.errors[name] && this.props.touched[name];
    return (
      <TextInput
        name={name}
        label={this.props.label}
        value={this.props.values[name]}
        margin="normal"
        error={showError}
        helperText={showError && this.props.errors[name]}
        onChange={this.props.handleChange}
        onBlur={this.props.handleBlur}
        disabled={this.props.disabled}
      />
    );
  }
}

export default TextField;