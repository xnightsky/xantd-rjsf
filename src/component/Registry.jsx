import React from "react";

import {
  DefaultFieldTemplate,
  DefaultArrayFieldTemplate,
  DefaultSchemaFieldTemplate,
} from "./Template.jsx";
import widgets from "./widget/";
import fields from "./field/";

// console.log("[fields]", fields);



const COMPONENT_TYPES = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
};

const widgetMap = {
  boolean: {
    default: "SwitchWidget",
  },
  string: {
    default: "TextWidget",
    text: "TextWidget",
    select: "SelectWidget",
  },
  number: {
    default: "NumberWidget",
    text: "TextWidget",
    select: "SelectWidget",
  },
  integer: {
    default: "NumberWidget",
    text: "TextWidget",
    select: "SelectWidget",
  },
  array: {
    default: "ArrayWidget",
    checkbox: "CheckboxWidget",
  },
  object: {
    default: "NotExistWidget",
  },
};


export function getSchemaType(schema) {
  let { type } = schema;
  if (!type && schema.enum) {
    type = "string";
  }
  return type;
}

export function getField(schema) {
  const fieldName = COMPONENT_TYPES[getSchemaType(schema)]
  return fields[fieldName];
}

export function getSchemaField() {
  return fields.SchemaField;
}


export function getWidget(schema, widget = "default", registeredWidgets = widgets) {
  if (typeof widget === "function") {
    return widget;
  }

  if (typeof widget !== "string") {
    throw new Error(`Unsupported widget definition: ${typeof widget}`);
  }
  const fieldType = getSchemaType(schema)
  const widgetName = widgetMap[fieldType][widget];
  return registeredWidgets[widgetName];
}




export function getDefaultRegistry (restProps = {}) {
  return {
    fields,
    SchemaFieldTemplate: DefaultSchemaFieldTemplate,
    FieldTemplate: DefaultFieldTemplate,
    ArrayFieldTemplate: DefaultArrayFieldTemplate,
    ...restProps,
  };
}
