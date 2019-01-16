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
  return (
    <Switch
      checked={value || initialValue}
      onChange={onChange}
      {...restProps}
    />
  )
}


export default SwitchWidget;
