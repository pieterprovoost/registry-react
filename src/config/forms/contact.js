module.exports = {
    name: "contact",
    updatable: true,
    schema: [
        {
            field: "type",
            type: "enum",
            name: "ContactType",
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
            field: "position",
            type: "textArray",
            editable: true
        },
        {
            field: "description",
            type: "text",
            editable: true
        },
        {
            field: "email",
            type: "textArray",
            editable: true
        },
        {
            field: "phone",
            type: "textArray",
            editable: true
        },
        {
            field: "organization",
            type: "text",
            editable: true
        },
        {
            field: "address",
            type: "textArray",
            editable: true
        },
        {
            field: "city",
            type: "text",
            editable: true
        },
        {
            field: "province",
            type: "text",
            editable: true
        },
        {
            field: "country",
            type: "enum",
            name: "Country",
            editable: true
        },
        {
            field: "postalCode",
            type: "text",
            editable: true
        },
        {
            field: "userId",
            type: "textArray",
            editable: true
        },
    ]
}