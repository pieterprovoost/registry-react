module.exports = {
    name: "user",
    updatable: true,
    schema: [
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