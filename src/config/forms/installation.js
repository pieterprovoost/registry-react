module.exports = {
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
    ],
    nested: ['contact', 'endpoint', 'identifier', 'tag', 'machineTag', 'comment'],
    relations: ['dataset']

}