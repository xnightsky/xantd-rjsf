import _ from "lodash";
import React from "react";

import {
  getWidget,
  getDefaultRegistry,
} from "../Registry.jsx";
import {
  toInitialValue,
} from "../schemaUtils.jsx"


function BooleanField(props) {
  const {
    schema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const Widget = getWidget(schema);
  return (
    <Widget
      schema={schema}
      options={{}}
      initialValue={toInitialValue(schema)}
      {...restProps}
    />
  );
}


export default BooleanField;
