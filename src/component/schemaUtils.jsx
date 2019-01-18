import _ from "lodash";





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


///////////////////////////////////////////////////////////////////
// INFO: metadata 往 jsonschema 统一 的美好愿望

class SchemaBase {
  constructor (metadata) {
    this.metadata = metadata || {};
  };

  xreset (metadata) {
    this.metadata = metadata;
    return this;
  }
}


class SchemaParser extends SchemaBase  {
  constructor(props) {
    super(props);
  }

  parse() {
    sniffer = new SchemaSniffer(this.metadata)
    const rtProps = {
      widget: "select",
    };

  }

  onSelectToEnumOptions () {
    const {
      enum: enumValue = [],
      enumName = [],
    } = this.metadata || {};

    return enumValue.map(
      function (value, index) {
        return {
          key: value,
          value: value,
          label: enumName[index] || value,
        };
      }
    )
  }
}


class SchemaSchedule extends SchemaBase  {
  constructor(props) {
    super(props);
  }

  ifThen(formValues, callback) {
    const {
      switch: switchValue = [],
    } = this.metadata || {};
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
