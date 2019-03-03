// import _ from "lodash";
const Ajv = require('ajv');
const AjvLocalize = require("ajv-i18n");


export function ajvValidate (value, schema) {
  if (_.isEmpty(schema)){
    this.setState({
      errorList: [],
    });
    return;
  }
  const ajv = new Ajv({
    allErrors: true,
  });
  const vresult = ajv.validate(schema, value || {})
  if (!vresult) {
    AjvLocalize && AjvLocalize.zh(ajv.errors);
  }
  return vresult;
}

