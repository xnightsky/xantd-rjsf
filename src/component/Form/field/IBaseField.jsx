import _ from "lodash";
import React from "react";
import update from "immutability-helper";

import { verbose, } from "../gconfig.jsx";
import {
  getValueFromEvent,
  // getValueFromPreventEvent,
} from "../utils.jsx";


class IBaseField extends React.Component {
  static defaultProps = {
    defaultValue: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      // value: undefined !== props.value ? props.value : props.defaultValue,
      value: props.value,
      // defaultValue: props.defaultValue,
    };
  }


  // 如果无覆盖，自动使用默认 componentWillReceiveProps 比对
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.value, this.props.value)) {
      verbose > 0 && console.log("IBaseField.componentWillReceiveProps: !=", nextProps.value, this.props.value);
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

  valueGetter() {
    return () => {
      const { value } = this.state;
      return value;
    }
  }

  valueSetter(callback = null) {
    return (event) => {
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
          this.triggerChange();
        }
      );
    }
  }

  attrGetter(aname) {
    return () => {
      const { value } = this.state;
      return value ? value[aname] : undefined;
    }
  }

  attrSetter(aname, callback = null) {
    const rthis = this;
    return (event) => {
      const newAttr = getValueFromEvent(event);
      let newState = {};
      if (rthis.state.value) {
        newState = update(
          rthis.state,
          {
            value: {
              $merge: {
                [aname]: newAttr,
              }
            }
          }
        );
      } else {
        newState = update(
          rthis.state,
          {
            value: {
              $set: {
                [aname]: newAttr,
              }
            }
          }
        );
      }
      rthis.setState(
        newState,
        () => {
          callback && callback();
          rthis.triggerChange();
        }
      )
    }
  }

  getValueProps(attrName, bridge) {
    if (bridge) {
      return {
        // value: undefined !== this.props.value ? this.props.value : this.props.defaultValue,
        value: this.props.value,
        onChange: this.props.onChange,
      };
    }

    if (attrName) {
      return {
        value: this.attrGetter(attrName)(),
        onChange: this.attrSetter(attrName),
      };
    } else {
      return {
        value: this.valueGetter()(),
        onChange: this.valueSetter(),
      };
    }
  }
}


export default IBaseField;
