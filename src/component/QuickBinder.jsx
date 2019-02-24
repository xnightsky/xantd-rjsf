// v0.5
import _ from "lodash";
import React from "react";
import update from 'immutability-helper';


function getValueFromEvent(event) {
  return (event && event.target) ? event.target.value : event;
}


export function clsUseStateAttr (
  rthis,
  attr,
  option = {},
) {
  /*
    eg:
      const [ dfile, _setDfile ] = clsUseStateAttr(
        this,
        "dfile",
      );
  */
  // console.log("clsUseStateAttr", rthis, attr);
  const {
    defaultValue = undefined,
    afterChange:fixAfterChange = undefined,
  } = option || {};
  rthis = rthis || this;
  let value = rthis.state[attr];
  value = undefined != value ? value : defaultValue;
  return [
    value,
    setter,
  ];

  function setter (event, afterChange = fixAfterChange) {
    const newAttr = getValueFromEvent(event);
    const newState = update(
      rthis.state,
      {
        $merge: {
          [attr]: newAttr,
        }
      }
    )
    rthis.setState(
      newState,
      afterChange,
    );
  }
}


export function clsUseStatePath (
  rthis,
  path,
  option = {},
) {
  // console.log("clsUseStatePath", rthis);
  const {
    defaultValue = undefined,
    afterChange:fixAfterChange = undefined,
  } = option || {};
  // console.log("clsUseStatePath", rthis, path, option);
  rthis = rthis || this;
  const value = _.get(rthis.state, path, defaultValue);
  return [
    value,
    (event, afterChange = fixAfterChange) => {
      const newValue = getValueFromEvent(event);
      const newState = rthis.state;
      _.set(newState, path, newValue)
      rthis.setState(
        newState,
        afterChange,
      );
    },
  ];
}


// export function clsGetValueProps (rthis) {
//   // console.log("clsGetValueProps", rthis);
//   return {
//     value: rthis.props.value,
//     onChange: rthis.props.onChange,
//   }
// }


// export function clsGetValueTrigger (rthis) {
//   // console.log("clsGetValueTrigger", rthis);
//   return (value = rthis.state.value) => {
//     const { onChange, } = rthis.props;
//     onChange && onChange(value)
//     return
//   }
// }


// export function clsGetNextValueProps (rthis, nextProps) {
//   if (!_.isEqual(nextProps.value, rthis.props.value)) {
//     return {
//       value: nextProps.value,
//     };
//   }
//   return {};
// }


export function getValueProps (props) {
  // console.log("clsGetValueProps", rthis);
  return {
    value: props.value,
    onChange: props.onChange,
  }
}


export function getWidgetValueProps(
  props,
  option = {},
) {
  const {
    value,
    onChange,
  } = getValueProps(props);
  const {
    parse,
    format,
  } = option;
  return [
    format ? format(value) : format,
    onChange ? triggerChange : onChange,
  ];
  function triggerChange (evalue) {
    const rtValue = parse ? parse(evalue) : evalue;
    return onChange(rtValue);
  }
}
