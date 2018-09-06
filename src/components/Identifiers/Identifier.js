import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IdentifierForm from './IdentifierForm';

const styles = theme => ({});

class Identifier extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = (event) => {
    if (typeof this.props.handleChange === 'function') {
      this.props.handleChange('changed');
    }
  };

  onSubmit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <div>
        <span>ID: {this.props.id} - endpoint: {this.props.endpoint}</span>
        <button onClick={this.handleChange}>Trigger change</button>

        <IdentifierForm onSubmit={this.onSubmit} values={{ email: 'test@sdf.df' }} testing="sdkfjhg"/>
      </div>
    );
  }
}

Identifier.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Identifier);


/*
Editable type interface
Components should
  update/delete/create themselves, based on a config about url.
  optional not update, but have a callback for completing the action.
  Always have  calback for completed actions.
  Configure which is available (CREATE; UPDATE; DELETE;)
  Handle edit mode, but option to trigger from props?

Form builder
  [
    {
      displayName, required, regex, component, fields, componentProps
      //eg firstName, true, null, Input, {}
      //eg 
    }
  ]

https://www.npmjs.com/package/formik er måske værd at se på?

  The form elements should update the state.
*/