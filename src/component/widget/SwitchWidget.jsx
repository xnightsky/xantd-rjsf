import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Switch,
} from "antd";

import {
  setWidgetValue,
} from "../utils.jsx";



function SwitchWidget(props) {
  const {
    initialValue,
    emptyValue,
    value,
    onChange,
    ...restProps
  } = props;
  // const rtValue = undefined !== value ? value : initialValue;
  const rtValue = setWidgetValue(
    {
      value,
      initialValue,
      emptyValue,
      onChange,
    }
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
