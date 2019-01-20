import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Switch,
} from "antd";



function SwitchWidget(props) {
  const {
    value,
    onChange,
    initialValue,
    ...restProps
  } = props;
  const rtValue = undefined !== value ? value : initialValue;
  return (
    <Switch
      checked={rtValue}
      onChange={onChange}
      {...restProps}
    />
  )
}


export default SwitchWidget;
