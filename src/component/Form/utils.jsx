

export function getValueFromEvent(event) {
  return (event && event.target) ? event.target.value : event;
}


export function getValueFromPreventEvent(e) {
  if (e && e.target) {
    preventEvent(e)
  }
  return getValueFromEvent(e);
}

export function preventEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}


export function setWidgetValue(
  {
    value = undefined,
    initialValue = undefined,
    emptyValue = undefined,
    onChange = undefined,
  }
) {
  // rtValue is undefined, set initialValue
  // rtValue is auto convert bool false, set emptyValue
  let rtValue = value;
  if (undefined === rtValue && undefined !== initialValue) {
    rtValue = initialValue;
  }
  if (!rtValue && undefined !== emptyValue) {
    rtValue = emptyValue;
  }
  // INFO: initialValue 会通过下次 value + onChange 循环赋值到 props.value
  return rtValue;
}


export function setWidgetValueAndTriggerChange(
  option,
  thisProps,
) {
  // 通过和 thisProps compare 解决 loop crash
  const {
    value = undefined,
    initialValue = undefined,
    emptyValue = undefined,
    onChange = undefined,
  } = option;
  const rtValue = setWidgetValue(option);
  console.log("setWidgetValueAndTriggerChange", rtValue, thisProps.value)
  if (!_.isEqual(rtValue, thisProps.value)) {
    debugger;
    onChange && requestAnimationFrame(
      () => {
        debugger;
        onChange(rtValue);;
      }
    );
  }
  return rtValue;
}


export function setWidgetValueFromProps(props) {
  return setWidgetValueAndTriggerChange(
    {
      value: props.value,
      initialValue: props.initialValue,
      emptyValue: props.emptyValue,
      onChange: props.onChange,
    },
    props,
  )
}
