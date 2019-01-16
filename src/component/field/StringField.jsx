import _ from "lodash";
import React from "react";
// import update from "immutability-helper";

import {
  defaultWidget,
  getWidget,
  getDefaultRegistry,
} from "../Registry.jsx";
import {
  isSelect,
  toSelectOptions,
} from "../scheamUtils.jsx"


function StringField(props) {
  const {
    schema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const selectOptions = isSelect(schema) ? toSelectOptions(schema) : {}
  const widgetName = _.isEmpty(selectOptions) ? "text" : "select";
  const Widget = getWidget(schema, widgetName);
  const rtProps = {
    ...selectOptions,
  };
  return (
    <Widget
      schema={schema}
      options={{}}
      {...restProps}
      {...rtProps}
    />
  );
}


export default StringField;
