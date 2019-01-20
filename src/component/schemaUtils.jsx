import _ from "lodash";


export function toInitialValue(schema) {
  return schema ? schema.default : undefined;
}


export function isSelect (schema) {
  const {
    enum: enumValue,
  } = schema || {};
  return !!enumValue;
}


export function toEnumOptions(schema) {
  const {
    enum: enumValue = [],
    enumName = [],
  } = schema || {};

  const enumOptions = enumValue.map(
    function (value, index) {
      return {
        key: value,
        value: value,
        label: enumName[index] || value,
      };
    }
  )
  return {
    enumOptions,
  };
}


export function isMultipleChoices(schema) {
  const {
    type,
    items:{
      enum: itemEnumValue,
    } = {},
    uniqueItems,
  } = schema;
  switch(type) {
    case "array":
      if (itemEnumValue && uniqueItems) {
        return true;
      }
    default:
      break;
  }
  return false
}


export function isFixedArray(schema) {
  const {
    type,
    items = null,
  } = schema;
  if ("array" === type) {
    return Array.isArray(items)
  }
  return false;
}


///////////////////////////////////////////////////////////////////
// INFO: metadata 往 jsonschema 统一 的美好愿望


class SchemaSchedule {
  ifThen(schema, formValues, callback) {
    const {
      switch: switchValue = [],
    } = schema || {};
    _.forEach(switchValue, function(icase) {
      const iproperties = _.get(icase, "if.properties") || {};
      // console.log("iproperties", iproperties, formValues)
      if (matchProperties(formValues, iproperties)) {
        callback(icase.if, icase.then || {})
      }
    });
    return

    function matchProperties(_formValues, properties) {
       let resultList = _.map(properties, function(iproperty, key) {
        let cbmatch = null;
        if (iproperty.const) {
          cbmatch = (fv) => {
            return fv ? fv[key] == iproperty.const : false;
          }
        } else if (iproperty.pattern) {
          cbmatch = (fv) => {
            regex = new RegExp(iproperty.pattern);
            return fv ? regex.test(fv[key]) : false;
          }
        } else {
          cbmatch = null;
        }
        return cbmatch ? cbmatch(_formValues) :  false
      })
      return resultList.length ? resultList.every(function(v) { return !!v; }) : false;
    }
  }
}
