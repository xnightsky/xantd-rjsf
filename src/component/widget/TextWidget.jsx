import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Input,
} from "antd";

import {
  getValueFromEvent,
  // getValueFromPreventEvent,
} from "../utils.jsx";


class TextWidget extends React.Component {
  static defaultProps = {
    initialValue: undefined,
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
    this.state = {
      value: props.initialValue || props.value || undefined,
    };
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  triggerChange = (value = this.state.value) => {
    const { onChange, } = this.props;
    onChange && onChange(value)
    return
  }

  triggerQuickChange(event, callback=null) {
    const newValue = getValueFromEvent(event);
    this.setState(
      update(
        this.state,
        {
          value: {
            $set: newValue,
          }
        }
      ),
      () => {
        callback && callback();
        this.debounceTriggerChange ? this.debounceTriggerChange() : this.triggerChange();
      }
    );
  }

  render() {
    const {
      value: _value,
      onChange: _onChange,
      initialValue: _initialValue,
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
