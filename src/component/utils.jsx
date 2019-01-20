

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


export function setRuntimeValue(
  {
    value = undefined,
    initialValue = undefined,
    defaultValue = undefined,
    onChange = undefined,
  }
) {
  // rtValue is undefined, set initialValue
  // rtValue is auto convert bool false, set defaultValue
  let rtValue = value;
  if (undefined === rtValue && undefined !== initialValue) {
    rtValue = initialValue;
  }
  if (!rtValue && undefined !== defaultValue) {
    rtValue = defaultValue;
  }
  if (rtValue !== value) {
    if (onChange) {
      requestAnimationFrame(
        () => {
          onChange(rtValue);
        }
      )
    }
  }
  return rtValue;
}


export function setRuntimeValueFromProps(props) {
  return setRuntimeValue(
    {
      value: props.value,
      initialValue: props.initialValue,
      defaultValue: props.defaultValue,
      onChange: props.onChange,
    }
  )
}
