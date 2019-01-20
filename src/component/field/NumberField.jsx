import _ from "lodash";
import React from "react";
// import update from "immutability-helper";

import {
  getWidget,
  getDefaultRegistry,
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
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const Widget = getWidget(schema);
  return (
    <Widget
      schema={schema}
      options={{}}
      initialValue={toDefault(schema)}
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
