const config = require('../config');

module.exports = {
    "name": "dataset",
    "endpoint": `${config.dataApi}dataset/`,
    "schema": [
      {
        field: "title",
        type: "text",
        editable: true
      },
      {
        field: "type",
        type: "enum",
        name: "DatasetType",
        editable: true
      },
      {
        field: "subtype",
        type: "enum",
        name: "DatasetSubtype",
        editable: true
      },
      {
        field: "doi",
        type: "text",
        editable: true,
        helperText: "Changes should be made understanding the consequences"
      },
      {
        field: "external",
        type: "boolean",
        editable: true
      },
      {
        field: "license",
        type: "text",
        editable: true
      },
      {
        field: "lockedForAutoUpdate",
        type: "boolean",
        editable: true
      },
      {
        field: "alias",
        type: "text",
        editable: true
      },
      {
        field: "abbrevation",
        type: "text",
        editable: true
      },
      {
        field: "description",
        type: "text",
        multiline: true,
        editable: true
      },
      {
        field: "publishingOrganizationKey",
        type: "relation",
        name: "organization",
        editable: true
    },
    {
        field: "installationKey",
        type: "relation",
        name: "installation",
        editable: true
    },
    {
        field: "parentDatasetKey",
        type: "relation",
        name: "dataset",
        editable: true
    },
    {
        field: "duplicateOfDatasetKey",
        type: "relation",
        name: "dataset",
        editable: true
    },
    {
        field: "citation.text",
        type: "text",
        multiline: true,
        editable: false
      },
      {
        field: "citationIdentifier",
        type: "text",
        editable: true
      }, 
      {
        field: "rights",
        type: "text",
        editable: true
      },
      {
        field: "homepage",
        type: "text",
        editable: true
      }, 
      {
        field: "logoUrl",
        type: "text",
        editable: true
      },
      {
        field: "language",
        type: "enum",
        name: "Language",
        editable: true
      },
      {
        field: "maintenanceUpdateFrequency",
        type: "enum",
        name: "MaintenanceUpdateFrequency",
        editable: true
      },
      
    ],
    nestedReadOnly: [],
    nested: ['contact', 'endpoint', 'identifier', 'tag', 'machineTag', 'comment'],
    relations: ['constituents']
  }