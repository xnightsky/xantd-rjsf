



const DEMO_PROPS_ROUTER = {
  default: {
    schema: {
      "type": "object",
      "properties": {
        "default": {
          "type": "object",
          "properties": {
              "source": {
                  "type": "array",
                  "items": {
                      "type": "object",
                      "properties": {
                        "itemName": {
                          "type": "string",
                        }
                      },
                  }
              }
          },
          "required": ["source",],
        },
        "display": {
          "type": "string",
        }
      },
    },
    initialValue: {
      "default": {
        "source":[
          {"itemName":"efg"},
          {"itemName":"xyc"}
        ],
        "display":"gili gili"
      }
    },
  },
  notification: {
    schema: {
      "type": "object",
      "properties": {
        "default": {
          "type": "object",
          "title": "通用通知",
          "properties": {
              "source": {
                  "title": "配置",
                  "type": "array",
                  "items": {
                      "type": "object",
                      "properties": {
                        "to": {
                          "title": "ID",
                          "type": "string",
                        },
                        "sevice_type": {
                          "title": "ID类型",
                          "type": "integer",
                          "enum": [0, 1, 2],
                          "enumNames": ["momoid", "群ID", "讨论组ID"]
                        },
                      },
                  }
              }
          },
          "required": ["source",],
        }
      },
    },
    initialValue: {},
  }
};
