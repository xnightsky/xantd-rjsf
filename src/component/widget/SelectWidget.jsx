import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Select,
} from "antd";

import Value from "./Value.jsx";


class SelectWidget extends Value {
  static defaultProps = {
    initialValue: undefined,
    defaultValue: undefined,
    value: undefined,
    onChange: undefined,
    enumOptions: [
      // {
      //   value,
      //   label,
      // }
    ]
  };

  constructor(props) {
    super(props);
    this.state = (this.state || {});
  }

  render() {
    const {
      initialValue,
      defaultValue,
      value: _value,
      onChange: _onChange,
      options:{
        enumOptions,
      } = {},
      style = {},
      ...restProps
    } = this.props;
    const {
      value,
    } = this.state;
    return (
      <Select
        style={{
          width: "100%",
          ...style,
        }}
        value={value}
        onChange={(e) => {
          this.triggerQuickChange(e);
        }}
        {...restProps}
      >
        {
          (enumOptions || []).map((iopt) => {
            return (
              <Option
                key={`${iopt.value}`}
                value={iopt.value}
              >
              {
                iopt.label
              }
              </Option>
            )
          })
        }
      </Select>
    );
  }
}


export default SelectWidget;
