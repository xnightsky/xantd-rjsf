import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Input,
} from "antd";

import {
  getValueFromEvent,
  setWidgetValueFromProps,
} from "../utils.jsx";


class IValueWidget extends React.Component {
  static defaultProps = {
    initialValue: undefined,
    emptyValue: undefined,
    value: undefined,
    onChange: undefined,
  };

  constructor (props) {
    super (props);
    this.state = {
      // value: undefined !== props.value ? props.value : props.initialValue,
      value: setWidgetValueFromProps(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({
        // value: nextProps.value,
        value: setWidgetValueFromProps(nextProps),
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
}


export default IValueWidget;
