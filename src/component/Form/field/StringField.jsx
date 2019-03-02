import _ from "lodash";
import React from "react";

import {
  getWidget,
  getDefaultRegistry,
  getUiOptions,
} from "../Registry.jsx";
import {
  toDefault,
  isSelect,
  toEnumOptions,
} from "../schemaUtils.jsx"


function StringField(props) {
  const {
    schema,
    uiSchema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const enumOptions = isSelect(schema) ? toEnumOptions(schema) : {}
  const {
    widget: widgetName = "default",
    ...options
  } = getUiOptions(uiSchema, widgetName);
  const rtWidgetName = _.isEmpty(enumOptions) ? widgetName : "select";
  const Widget = getWidget(schema, rtWidgetName);
  return (
    <Widget
      schema={schema}
      options={{
        ...options,
        ...enumOptions,
      }}
      defaultValue={toDefault(schema)}
      {...restProps}
    />
  );
}


export default StringField;
