import React from 'react';
import RegistryForm from '../shared/RegistryForm'
import RegistryFormWrapper from '../shared/RegistryFormWrapper'

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
            <RegistryFormWrapper>
                <RegistryForm config={config} path={config.name} id={key}></RegistryForm>
            </RegistryFormWrapper>
        )
    }


}


export default InstallationKey;