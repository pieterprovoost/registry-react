import React from 'react';
import RegistryForm from '../shared/RegistryForm'

const config = {
    "name": "installation",
    "schema": [
        {
            field: "title",
            type: "text",
            editable: true
        },
        {
            field: "organizationKey",
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
            field: "type",
            type: "enum",
            name: "InstallationType",
            editable: true
        },
        {
            field: "disabled",
            type: "boolean",
            editable: true
        },
    ]
}

class InstallationKey extends React.Component {

    render() {
        const { match: { params: { key } } } = this.props;
        return (
            <RegistryForm config={config}  path={`${config.name}/${key}`}></RegistryForm>
        )
    }


}


export default InstallationKey;