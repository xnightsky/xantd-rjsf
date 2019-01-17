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
    ...restProps
  } = props;
  return (
    <InputNumber
      {...restProps}
    />
  )
}


export default NumberWidget;
