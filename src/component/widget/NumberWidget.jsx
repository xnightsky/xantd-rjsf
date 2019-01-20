import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  InputNumber,
} from "antd";

import {
  getValueFromEvent,
  // getValueFromPreventEvent,
} from "../utils.jsx";


function NumberWidget (props) {
  const {
    initialValue,
    value,
    ...restProps
  } = props;
  const rtValue = undefined !== value ? value : initialValue;
  return (
    <InputNumber
      value={rtValue}
      {...restProps}
    />
  )
}


export default NumberWidget;
