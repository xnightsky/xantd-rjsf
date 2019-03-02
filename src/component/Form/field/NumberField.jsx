import _ from "lodash";
import React from "react";
// import update from "immutability-helper";

import {
  getWidget,
  getDefaultRegistry,
  getUiOptions,
} from "../Registry.jsx";
import {
  getValueFromPreventEvent,
} from "../utils.jsx";
import {
  toDefault,
} from "../schemaUtils.jsx"


function NumberField(props) {
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
      defaultValue={toDefault(schema)}
      {...restProps}
      onChange={(e) => {
        let evalue = getValueFromPreventEvent(e);
        evalue = Number(evalue);
        return restProps.onChange(evalue)
      }}
    />
  );
}


export default NumberField;
