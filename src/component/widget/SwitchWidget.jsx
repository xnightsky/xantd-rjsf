import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Switch,
} from "antd";

import {
  setRuntimeValue,
} from "../utils.jsx";



function SwitchWidget(props) {
  const {
    initialValue,
    defaultValue,
    value,
    onChange,
    ...restProps
  } = props;
  // const rtValue = undefined !== value ? value : initialValue;
  const rtValue = setRuntimeValue(
    {
      value,
      initialValue,
      defaultValue,
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
