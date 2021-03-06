const config = require('../config');

module.exports = {
  "name": "organization",
  "endpoint": `${config.dataApi}organization/`,
  "schema": [
    {
      field: "title",
      type: "text",
      editable: true
    },
    {
      field: "address",
      type: "textArray",
      editable: true
    },
    {
      field: "endorsingNodeKey",
      type: "relation",
      name: "node",
      editable: true
    },
    {
      field: "endorsementApproved",
      type: "boolean",
      editable: false
    },
    {
      field: "description",
      type: "text",
      multiline: true,
      editable: true
    },
    {
      field: "email",
      type: "textArray",
      editable: true
    },
    {
      field: "homepage",
      type: "textArray",
      editable: true
    },
    {
      field: "country",
      type: "enum",
      name: "Country",
      editable: true
    }
  ],
  nestedReadOnly: [],
  nested: ['contact', 'endpoint', 'identifier', 'tag', 'machineTag', 'comment'],
  relations: ['hostedDataset', 'publishedDataset','installation']
}