

export default {
  schema: {
    "title": "A registration form",
    "description": "A simple form example.",
    "type": "object",
    "required": [
      "firstName",
      "lastName"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "title": "First name",
        "default": "Chuck"
      },
      "lastName": {
        "type": "string",
        "title": "Last name"
      },
      "age": {
        "type": "integer",
        "title": "Age"
      },
      "bio": {
        "type": "string",
        "title": "Bio"
      },
      "password": {
        "type": "string",
        "title": "Password",
        "minLength": 3
      },
      "telephone": {
        "type": "string",
        "title": "Telephone",
        "minLength": 10
      }
    }
  },
  uiSchema: {
    "listOfStrings": {
      "items": {
        "ui:emptyValue": ""
      }
    },
  },
  initialValue: {
    "firstName": "Chuck",
    "lastName": "Norris",
    "age": 75,
    "bio": "Roundhouse kicking asses since 1940",
    "password": "noneed"
  }
};
