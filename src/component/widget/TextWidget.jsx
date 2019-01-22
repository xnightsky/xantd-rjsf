import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Input,
} from "antd";

import Value from "./IValueWidget.jsx";


class TextWidget extends Value {
  static defaultProps = {
    initialValue: undefined,
    emptyValue: "",
    value: undefined,
    onChange: undefined,
    optimize: {
      debounce: {
        wait: 300,
        options: { 'maxWait': 3000 }
      },
    }
  };

  constructor (props) {
    super (props);
    this.state = (this.state || {});
    if (props.optimize && props.optimize.debounce) {
      let debounceArgs = props.optimize.debounce
      this.debounceTriggerChange = _.debounce(
        this.triggerChange,
        debounceArgs.wait,
        debounceArgs.options,
      );
    } else {
      this.debounceTriggerChange = null;
    }
  }

  render() {
    const {
      initialValue: _initialValue,
      emptyValue: _emptyValue,
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
