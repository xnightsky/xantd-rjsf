import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  InputNumber,
} from "antd";

import {
  setWidgetValue,
} from "../utils.jsx";


function NumberWidget (props) {
  const {
    initialValue,
    defaultValue,
    value,
    onChange,
    ...restProps
  } = props;
  // const rtValue = undefined !== value ? value : initialValue;
  const rtValue = setWidgetValue(
    {
      value,
      initialValue,
      defaultValue,
      onChange,
    }
  );
  return (
    <InputNumber
      value={rtValue}
      onChange={onChange}
      {...restProps}
    />
  )
}


export default NumberWidget;
