import _ from "lodash";
import React from "react";
import update from "immutability-helper";

import {
  getValueFromEvent,
  // getValueFromPreventEvent,
} from "../utils.jsx";
import { verbose, } from "../gconfig.jsx";



class IBaseField extends React.Component {
  static defaultProps = {
    initialValue: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: undefined !== props.value ? props.value : props.initialValue,
    };
  }


  // 如果无覆盖，自动使用默认 componentWillReceiveProps 比对
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(IBaseField.value, this.props.value)) {
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
    return (event) => {
      const newAttr = getValueFromEvent(event);
      const newState = "object" === typeof this.state.value ? update(
        this.state,
        {
          value: {
            $merge: {
              [aname]: newAttr,
            }
          }
        }
      ) : update(
        this.state,
        {
          value: {
            $set: {
              [aname]: newAttr,
            }
          }
        }
      );
      this.setState(
        newState,
        () => {
          callback && callback();
          this.triggerChange();
        }
      )
    }
  }

  getValueProps(attrName, bridge) {
    if (bridge) {
      return {
        value: this.props.value || this.props.initialValue,
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
      }
    }
  }
}


export default IBaseField;
