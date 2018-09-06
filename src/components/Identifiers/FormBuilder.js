// Helper styles for demo
import DisplayFormikState from './DisplayFormikState';
import React, { Component } from 'react';
import { Formik, withFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
import TextField from './input/TextField';
import ChipField from './input/ChipField';
import SuggestField from './input/SuggestField';

import CoordinateInput from './input/CoordinateInput';
import LocationField from './input/LocationField';

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
        .min(1, 'C\'mon! Your name cannot be that short.')
        .required('A first name is required.')
    },
    {
      name: 'email',
      label: 'translationPath.email',
      mapping: 'nested.location.email',
      component: TextField,
      validationSchema: yup.string()
        .email('That no email - why you try to cheat?')
        .required('Email is required.')
    }
  ],
  postify: function(formData) {
    let postData = _.clone(formData);
    postData.latitude = postData.coordinate[0];
    postData.longitude = postData.coordinate[1];
    delete postData.coordinate;
    return postData;
  },
  formify: function(apiData) {
    let formData = _.clone(apiData);
    formData.coordinate = [apiData.latitude, apiData.longitude];
    delete formData.latitude;
    delete formData.longitude;
    return formData;
  }
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

    let handleSubmit = (data) => {this.props.onSubmit(formConfig.postify(data))};
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
          .required('Coordinate required.')
          .min(-180, 'Must be more than -180')
          .max(180, 'Must be less than 180')
      );

    validationSchema.organization = yup.string()
      .required('publisher required.')
      .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'please select one of the selected publishers');

    validationSchema = yup.object().shape(validationSchema);

    let startValues = {};
    formConfig.fields.forEach(function (e) {
      startValues[e.name] = values ? values[e.name] || 'start' : 'start';
    });
    startValues.coordinate = [50, 75];
    startValues.emails = ['sdf@sdf.df', 'morten@sdf.l'];
    startValues.organization = '1bb0cdae-54b7-4648-af44-bf7eecfdf692';

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
                <SuggestField {...props} name="organization" label="organization" type="organization"/>
                
                <CoordinateInput
                  id="coordinate"
                  name="coordinate"
                  onChange={setFieldValue}
                  error={errors.coordinate && touched.coordinate}
                  helperText={errors.coordinate}
                  value={values.coordinate}
                />

                <LocationField {...props} name="coordinate"/>

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