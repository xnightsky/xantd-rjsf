import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Input,
} from "antd";

import IValueWidget from "./IValueWidget.jsx";


class TextWidget extends IValueWidget {
  static defaultProps = {
    defaultValue: undefined,
    // emptyValue: "",
    value: undefined,
    onChange: undefined,
  };

  constructor (props) {
    super (props);
    this.state = (this.state || {});
  }

  render() {
    const {
      defaultValue: _defaultValue,
      // emptyValue: _emptyValue,
      value: _value,
      onChange: _onChange,
      ...restProps
    } = this.props;
    const {
      value,
    } = this.state;
    return (
      <Input
        value={value}
        onChange={(e) => {
          this.triggerQuickChange(e);
        }}
        {...restProps}
      />
    );
  }
}


export default TextWidget;
