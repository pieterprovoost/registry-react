module.exports = {
    "name": "node",
    "readOnly": true,
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
        field: "type",
        type: "enum",
        name: "NodeType",
        editable: false
      },
      {
        field: "participationStatus",
        type: "enum",
        name: "ParticipationStatus",
        editable: false
      },
      {
        field: "gbifRegion",
        type: "enum",
        name: "GbifRegion",
        editable: false
      },
      {
        field: "country",
        type: "enum",
        name: "Country",
        editable: false
      },
      {
        field: "continent",
        type: "enum",
        name: "Continent",
        editable: false
      },
    ],
    nestedReadOnly: ['contact'],
    nested: [ 'endpoint', 'identifier', 'tag', 'machineTag', 'comment'],
    relations: ['dataset', 'organization','installation', 'pendingEndorsement']
  }
