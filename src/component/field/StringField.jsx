import _ from "lodash";
import React from "react";
// import update from "immutability-helper";

import {
  // defaultWidget,
  getWidget,
  getDefaultRegistry,
} from "../Registry.jsx";
import {
  toInitialValue,
  isSelect,
  toEnumOptions,
} from "../schemaUtils.jsx"


function StringField(props) {
  const {
    schema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const enumOptions = isSelect(schema) ? toEnumOptions(schema) : {}
  const widgetName = _.isEmpty(enumOptions) ? "text" : "select";
  const Widget = getWidget(schema, widgetName);
  return (
    <Widget
      schema={schema}
      options={{
        ...enumOptions
      }}
      initialValue={toInitialValue(schema)}
      {...restProps}
    />
  );
}


export default StringField;
