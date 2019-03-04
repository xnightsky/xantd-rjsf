
import {
  getValueFromEvent as QB_getValueFromEvent,
  getValueFromPreventEvent as QB_getValueFromPreventEvent,
  preventEvent as QB_preventEvent,
  getWidgetValueProps as QB_getWidgetValueProps,
} from "../QuickBinder.jsx";


export const getValueFromEvent = QB_getValueFromEvent;
export const getValueFromPreventEvent = QB_getValueFromPreventEvent;
export const preventEvent = QB_preventEvent;


export function setWidgetValue(
  {
    value = undefined,
    defaultValue = undefined,
    // emptyValue = undefined,
    onChange = undefined,
  }
) {
  // // rtValue is undefined, set defaultValue
  // let rtValue = value;
  // if (undefined === rtValue && undefined !== defaultValue) {
  //   rtValue = defaultValue;
  // }
  // // // rtValue is auto convert bool false, set emptyValue
  // // if (!rtValue && undefined !== emptyValue) {
  // //   rtValue = emptyValue;
  // // }

  const {
    value: rtValue,
  } = QB_getWidgetValueProps(
    {
      value,
      defaultValue,
      onChange,
    }
  );

  // INFO: defaultValue 会通过下次 value + onChange 循环赋值到 props.value
  return rtValue;
}


export function setWidgetValueAndTriggerChange(
  option,
  thisProps,
) {
  // 通过和 thisProps compare 解决 loop crash
  const {
    value = undefined,
    defaultValue = undefined,
    // emptyValue = undefined,
    onChange = undefined,
  } = option;
  const rtValue = setWidgetValue(option);
  // console.log("setWidgetValueAndTriggerChange", rtValue, thisProps.value)
  if (!_.isEqual(rtValue, thisProps.value)) {
    onChange && requestAnimationFrame(
      () => {
        onChange(rtValue);;
      }
    );
  }
  return rtValue;
}


// DEBUG
// setWidgetValueAndTriggerChange = setWidgetValue;


export function setWidgetValueFromProps(props) {
  return setWidgetValueAndTriggerChange(
    {
      value: props.value,
      defaultValue: props.defaultValue,
      // emptyValue: props.emptyValue,
      onChange: props.onChange,
    },
    props,
  )
}


export class FNValve {
  static debounce(
    {
      fn,
      ctl = {}
    }
  ) {
    const {
      wait = 300,
      options = {
        maxWait: 3000
      },
    } = ctl;
    return _.debounce(
      fn,
      wait,
      options,
    );
  }

  static debounceOnRAF(
    {
      fn,
      ctl = {}
    }
  ) {
    const {
      wait = 300,
      options = {
        maxWait: 3000
      },
    } = ctl;
    const debounceFN = _.debounce(
      fn,
      wait,
      options,
    );
    return function () {
      const refargs = Array.from(arguments);
      requestAnimationFrame(() => {
        debounceFN(...refargs);
      })
    };
  }
}
