module.exports = {
    "name": "organization",
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
        editable: true
      },
      {
        field: "participationStatus",
        type: "enum",
        name: "ParticipationStatus",
        editable: true
      },
      {
        field: "country",
        type: "enum",
        name: "Country",
        editable: true
      },
      {
        field: "gbifRegion",
        type: "enum",
        name: "GbifRegion",
        editable: true
      }
    ],
    nested: ['contact', 'endpoint', 'identifier', 'tag', 'machineTag', 'comment'],
    relations: ['dataset', 'organization','installation']
  }
