import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Checkbox,
} from "antd";

import IValueWidget from "./IValueWidget.jsx";


class CheckboxWidget extends IValueWidget {
  static defaultProps = {
    defaultValue: undefined,
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
      defaultValue,
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
    return (
      <Checkbox.Group
        style={{
          width: "100%",
          ...style,
        }}
        value={value}
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
