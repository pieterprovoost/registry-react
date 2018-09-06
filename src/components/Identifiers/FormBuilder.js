// Helper styles for demo
import DisplayFormikState from './DisplayFormikState';
import React, { Component } from 'react';
import { Formik, withFormik } from 'formik';
import * as yup from 'yup';

import { withStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
import TextField from './Input/TextField';
import ChipField from './Input/ChipField';
import SuggestField from './Input/SuggestField';

import CoordinateInput from './Input/CoordinateInput';

const styles = theme => ({
  textField: {
    width: 300
  }
});

const formConfig = {
  endpoint: '//api.gbif-dev.org/testing/19238476',
  fields: [
    {
      name: 'firstName',
      label: 'translationPath.firstName',
      mapping: 'nested.location.firstName',
      component: TextField,
      validationSchema: yup.string()
        .min(2, 'C\'mon your name is longer than that')
        .required('A first name is required.')
    },
    {
      name: 'email',
      label: 'translationPath.email',
      mapping: 'nested.location.email',
      component: TextField,
      validationSchema: yup.string()
        .email('Invalid email address')
        .required('Email is required.')
    }
  ]
};

class FormBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = { values: {} };
  }

  render() {
    const {
      classes,
      values
    } = this.props;

    let handleSubmit = this.props.onSubmit;
    let handleCancel = this.props.onCancel;

    // construct validation schema from config file
    let validationSchema = {};
    formConfig.fields.forEach(function (e) {
      validationSchema[e.name] = e.validationSchema;
    });
    validationSchema.emails = yup.array().ensure()
      .min(2, 'Must contain at least one element')
      .of(
        yup.string()
          .email('Invalid email address')
      );
    validationSchema.coordinate = yup.array().of(
        yup.number()
          .min(-180, 'Must be more than -180')
          .max(180, 'Must be less than 180')
          .required('Coordinate required.')
      );
    validationSchema.latitude = yup.number()
      .min(-90, 'Must be more than -90')
      .max(90, 'Must be less than 90')
      .required('Latitude required.');
    validationSchema.longitude = yup.number()
      .min(-180, 'Must be more than -180')
      .max(180, 'Must be less than 180')
      .required('Longitude required.');

    validationSchema.organization = yup.string()
      .required('publisher required.')
      .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'please select one of the selected publishers');

    validationSchema = yup.object().shape(validationSchema);

    let startValues = {};
    formConfig.fields.forEach(function (e) {
      startValues[e.name] = values[e.name] || '';
    });
    startValues.coordinate = 50;
    startValues.emails = ['sdf'];
    startValues.latitude = 0;
    startValues.longitude = 0;
    startValues.organization = '';

    return (
      <div>
        <Formik
          initialValues={startValues}
          onSubmit={handleSubmit}
          onReset={handleCancel}
          validationSchema={validationSchema}
          render={(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
              setTouched
            } = props;
            let inputs = formConfig.fields.map(function (e, i) {
              return (
                <div key={i}>
                  <TextField {...props} name={e.name} label={e.label} />
                </div>
              );
            });

            return (
              <form onSubmit={handleSubmit}>
                {inputs}
                <ChipField {...props} name="emails" label="emails" />
                <h1>sdf</h1>
                <SuggestField {...props} name="organization" label="Publisher" type="organization"/>
                
                <CoordinateInput
                  id="coordinate"
                  name="coordinate"
                  onChange={setFieldValue}
                  error={errors.coordinate && touched.coordinate}
                  helperText={errors.coordinate}
                  value={50}
                />

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <p>
                  {JSON.stringify(values, null, 2)}
                </p>
              </form>
            )
          }
          }
        >
        </Formik>
      </div >
    );
  }
}

export default withStyles(styles)(FormBuilder);

/*

Ønsket brug

<FormBuilder endpoint config(fields:validationschema, fieldMap, inputtype) id onChange formName? />

*/