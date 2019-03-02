import _ from "lodash";
import React from "react";
import update from "immutability-helper";
// import {} from "antd";

import { verbose, } from "../gconfig.jsx";
import {
  getValueFromEvent,
  FNValve,
} from "../utils.jsx";
import {
  getWidgetValueProps,
  triggerWidgetDefaultValue,
} from "../../QuickBinder.jsx";


class IValueWidget extends React.Component {
  static defaultProps = {
    defaultValue: undefined,
    value: undefined,
    onChange: undefined,
  };

  constructor (props) {
    super (props);
    const rtProps = getWidgetValueProps(
      {
        value: props.value,
        onChange: props.onChange,
        defaultValue: props.defaultValue,
        format: props.format,
      }
    );
    this.state = {
      ...rtProps,
    };
    triggerWidgetDefaultValue(this.state, props);
    this.debounceTriggerChange = FNValve.debounce({
      fn: this.triggerChange,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      verbose > 0 && console.log("IValueWidget.componentWillReceiveProps: !=", nextProps.value, this.state.value);
      const rtProps = getWidgetValueProps(
        {
          value: nextProps.value,
          onChange: nextProps.onChange,
          defaultValue: nextProps.defaultValue,
          format: nextProps.format,
        }
      );
      this.setState({
        ...rtProps,
      });
      // triggerWidgetDefaultValue(this.state, nextProps);
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
        if (this.debounceTriggerChange) {
          this.debounceTriggerChange();
        } else {
          this.triggerChange();
        }
      }
    );
  }
}


export default IValueWidget;
