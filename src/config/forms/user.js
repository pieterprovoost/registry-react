const config = require('../config');

module.exports = {
    name: "user",
    updatable: true,
    endpoint: `${config.userAdminApi}`,
    schema: [
        {
            field: "userName",
            type: "text",
            editable: true
        },
        {
            field: "firstName",
            type: "text",
            editable: true
        },
        {
            field: "lastName",
            type: "text",
            editable: true
        },

        {
            field: "email",
            type: "text",
            editable: true
        },
        {
            field: "settings.country",
            type: "nestedEnum",
            name: "Country",
            editable: true
        },
        {
            field: "roles",
            type: "enum",
            name: "UserRole",
            multiple: true,
            editable: true
        },
    ],
    nestedReadOnly: [],
    nested: [],
    relations: []
}