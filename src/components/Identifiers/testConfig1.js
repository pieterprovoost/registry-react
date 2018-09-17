import * as yup from "yup";
import _ from "lodash";

// input types
import TextField from "./input/TextField";
import ChipField from "./input/ChipField";
import SuggestField from "./input/SuggestField";
import LocationField from "./input/LocationField";

const formConfig = {
  fields: [
    {
      name: "firstName",
      label: "translationPath.firstName",
      mapping: "nested.location.firstName",
      component: TextField,
      validationSchema: yup
        .string()
        .min(1, "C'mon! Your name cannot be that short.")
        .required("A first name is required.")
    },
    {
      name: "email",
      label: "translationPath.email",
      mapping: "nested.location.email",
      component: TextField,
      validationSchema: yup
        .string()
        .email("That no email - why you try to cheat?")
        .required("Email is required.")
    },
    {
      name: "organization",
      label: "translationPath.organization",
      mapping: "organization",
      component: SuggestField,
      componentProps: {type: 'organization'},
      validationSchema: yup
        .string()
        .required("publisher required.")
        .matches(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
          "please select one of the selected publishers"
        )
    },
    {
      name: "emails",
      label: "translationPath.emails",
      mapping: "nested.location2.emails",
      defaultValue: [],
      component: ChipField,
      validationSchema: yup
        .array()
        .ensure()
        .min(1, "Must contain at least one element")
        .of(yup.string().email("Invalid email address"))
    },
    {
      name: "coordinate",
      label: "translationPath.coordinates",
      mapping: "coordinate",
      component: LocationField,
      validationSchema: yup.object().shape({
        lat: yup
          .number()
          .typeError('Latitude must be a number')
          .required("Coordinate required.")
          .min(-180, "Must be more than -180")
          .max(180, "Must be less than 180"),
        lng: yup
          .number()
          .typeError('Longitude must be a number')
          .required("Coordinate required.")
          .min(-180, "Must be more than -180")
          .max(180, "Must be less than 180")
      })
    }
  ],
  postify: function (formData) {
    let postData = {};
    formConfig.fields.forEach((field) => {
       _.set(postData, field.mapping, formData[field.name]);
    });
    postData.latitude = postData.coordinate.lat;
    postData.longitude = postData.coordinate.lng;
    delete postData.coordinate;
    return postData;
  },
  formify: function (apiData) {
    apiData = apiData || {};
    let formData = {};
    formConfig.fields.forEach((field) => {
      let defaultValue = _.isUndefined(field.defaultValue) ? '' : field.defaultValue;
      formData[field.name] = _.get(apiData, field.mapping, defaultValue);
    });
    formData.coordinate = { lat: apiData.latitude || '', lng: apiData.longitude  || ''};
    delete formData.latitude;
    delete formData.longitude;
    console.log(formData);
    return formData;
  }
};

export default formConfig;