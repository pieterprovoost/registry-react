// Helper styles for demo
import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    width: 300
  }
});

class FormBuilder extends Component {
  constructor(props) {
    super(props);

    this.renderForm = this.renderForm.bind(this);

    // construct validation schema from config file
    let validationSchema = {};
    props.config.fields.forEach(function (e) {
      validationSchema[e.name] = e.validationSchema;
    });
    validationSchema = yup.object().shape(validationSchema);

    // set initial values
    let startValues = props.config.formify(props.values);

    this.state = { values: startValues, startValues: startValues, validationSchema: validationSchema, config: props.config };
  }

  renderForm(props, classes, disabled) {
    const {isSubmitting, handleSubmit, handleReset} = props;

    // build our input components from the config
    let inputs = this.state.config.fields.map(function (e, i) {
      let ComponentType = e.component;
      return (
        <div key={i}>
          <ComponentType {...props} name={e.name} label={e.label} {...e.componentProps} disabled={disabled}/>
        </div>
      );
    });

    return (
      <form onSubmit={handleSubmit}>
        {inputs}
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button variant="contained" className={classes.button} onClick={handleReset} disabled={isSubmitting}>
            Cancel
        </Button>
          <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Grid>
      </form>
    );
  }
  
  render() {
    const { classes, onCancel, disabled } = this.props;

    let handleSubmit = data => {
      this.props.onSubmit(this.state.config.postify(data));
    };

    return (
      <div>
        <Formik
          initialValues={this.state.startValues}
          onSubmit={handleSubmit}
          onReset={onCancel}
          validationSchema={this.state.validationSchema}
          render={props => {return this.renderForm(props, classes, disabled)}}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FormBuilder);

/*

Ønsket brug

<FormBuilder endpoint config(fields:validationschema, fieldMap, inputtype) id onChange formName? />

*/
