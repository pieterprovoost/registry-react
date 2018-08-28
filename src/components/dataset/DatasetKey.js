import React from 'react';
import RegistryForm from '../shared/RegistryForm'

const config = {
    "name": "dataset",
    "schema": [
        {
            field: "type",
            type: "enum",
            name: "DatasetType",
            editable: true
        },
        {
            field: "subType",
            type: "enum",
            name: "DatasetSubtype",
            editable: true
        },
        {
            field: "external",
            type: "boolean",
            editable: true,
            helperText: "Indicates that the dataset is found through integration with metadata networks, and not registered directly with GBIF"
        },
        {
            field: "title",
            type: "text",
            editable: true
        },
        {
            field: "publishingOrganizationKey",
            type: "relation",
            name: "organization",
            editable: true
        },
        {
            field: "description",
            type: "text",
            multiline: true,
            editable: true
        },
        {
            field: "language",
            type: "enum",
            name: "Language",
            editable: true,
            helperText: "Please select the dataset language"
        },
        {
            field: "lockedForAutoUpdate",
            type: "boolean",
            editable: true
        },
        {
            field: "installationKey",
            type: "relation",
            name: "installation",
            editable: true
        },
        {
            field: "maintenanceUpdateFrequency",
            type: "enum",
            name: "MaintenanceUpdateFrequency",
            editable: true
        }
    ]
}

class DatasetKey extends React.Component {


    render() {
        const { match: { params: { key } } } = this.props;
        return (
            <RegistryForm config={config}  path={`${config.name}/${key}`}></RegistryForm>
        )
    }


}


export default DatasetKey;