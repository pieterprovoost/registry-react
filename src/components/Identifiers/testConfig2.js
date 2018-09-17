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
      name: "title",
      label: "translationPath.title",
      mapping: "title",
      component: TextField,
      validationSchema: yup
        .string()
        .min(2, "That is a very short title. We suggest something slightly longer.")
        .required("A first name is required.")
    },
    {
      name: "organization",
      label: "translationPath.organization",
      mapping: "organizationKey",
      component: SuggestField,
      componentProps: {type: 'organization'},
      validationSchema: yup
        .string()
        .required("organization required.")
        .matches(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
          "please select one of the selected organizations"
        )
    },
    {
      name: "description",
      label: "translationPath.description",
      mapping: "description",
      component: TextField,
      validationSchema: yup
        .string()
        .required("A description is required.")
    }
  ],
  postify: function (formData) {
    let postData = {};
    formConfig.fields.forEach((field) => {
       _.set(postData, field.mapping, formData[field.name]);
    });
    return postData;
  },
  formify: function (apiData) {
    apiData = apiData || {};
    let formData = {};
    formConfig.fields.forEach((field) => {
      let defaultValue = _.isUndefined(field.defaultValue) ? '' : field.defaultValue;
      formData[field.name] = _.get(apiData, field.mapping, defaultValue);
    });
    return formData;
  }
};

export default formConfig;