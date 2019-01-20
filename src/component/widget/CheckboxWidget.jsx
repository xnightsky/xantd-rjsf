import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Checkbox,
} from "antd";

import Value from "./Value.jsx";


class CheckboxWidget extends Value {
  static defaultProps = {
    initialValue: undefined,
    value: undefined,
    onChange: undefined,
    options: {
      enumOptions: [
        // {
        //   value,
        //   label,
        // }
      ]
    },
  };

  constructor(props) {
    super(props);
    this.state = (this.state || {});
  }

  render() {
    const {
      initialValue,
      value: _value,
      onChange: _onChange,
      options: {
        enumOptions
      },
      style = {},
      ...restProps
    } = this.props;
    const {
      value,
    } = this.state;
    const rtValue = undefined !== value ? value : initialValue;
    return (
      <Checkbox.Group
        style={{
          width: "100%",
          ...style,
        }}
        value={rtValue}
        onChange={(e) => {
          this.triggerQuickChange(e);
        }}
        options={enumOptions}
        {...restProps}
      />
    );
  }
}


export default CheckboxWidget;
