import _ from "lodash";
import React from "react";

import {
  getWidget,
  getDefaultRegistry,
  getUiOptions,
} from "../Registry.jsx";
import {
  toDefault,
} from "../schemaUtils.jsx"


function BooleanField(props) {
  const {
    schema,
    uiSchema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const {
    widget: widgetName = "default",
    ...options
  } = getUiOptions(uiSchema);
  const Widget = getWidget(schema, widgetName);
  return (
    <Widget
      schema={schema}
      options={{
        ...options,
      }}
      initialValue={toDefault(schema)}
      {...restProps}
    />
  );
}


export default BooleanField;
