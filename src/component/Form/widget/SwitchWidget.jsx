import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Switch,
} from "antd";

import {
  setWidgetValueAndTriggerChange,
} from "../utils.jsx";



function SwitchWidget(props) {
  const {
    defaultValue,
    // emptyValue,
    value,
    onChange,
    ...restProps
  } = props;
  // const rtValue = undefined !== value ? value : defaultValue;
  const rtValue = setWidgetValueAndTriggerChange(
    {
      value,
      defaultValue,
      // emptyValue,
      onChange,
    },
    props,
  );
  return (
    <Switch
      checked={rtValue}
      onChange={onChange}
      {...restProps}
    />
  )
}


export default SwitchWidget;
