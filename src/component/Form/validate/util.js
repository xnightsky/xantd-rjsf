import _ from "lodash";
const toPath = _.toPath;
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
  let errorSchema = {}
  if (!vresult) {
    AjvLocalize && AjvLocalize.zh(ajv.errors);
    let errors = transformAjvErrors(ajv.errors)
    errorSchema = toErrorSchema(errors)
  }
  return {
    result: vresult,
    ajv,
    errorSchema,
  };
}


// from: https://github.com/mozilla-services/react-jsonschema-form/blob/92233e40e75854b50754a836a9b999c11eff75e7/src/validate.js
function transformAjvErrors(errors = []) {
  /**
   * Transforming the error output from ajv to format used by jsonschema.
   * At some point, components should be updated to support ajv.
   */
  if (errors === null) {
    return [];
  }

  return errors.map(e => {
    const { dataPath, keyword, message, params } = e;
    let property = `${dataPath}`;

    // put data in expected format
    return {
      name: keyword,
      property,
      message,
      params, // specific to ajv
      stack: `${property} ${message}`.trim(),
    };
  });
}
function toErrorSchema(errors) {
  // Transforms a ajv validation errors list:
  // [
  //   {property: ".level1.level2[2].level3", message: "err a"},
  //   {property: ".level1.level2[2].level3", message: "err b"},
  //   {property: ".level1.level2[4].level3", message: "err b"},
  // ]
  // Into an error tree:
  // {
  //   level1: {
  //     level2: {
  //       2: {level3: {errors: ["err a", "err b"]}},
  //       4: {level3: {errors: ["err b"]}},
  //     }
  //   }
  // };
  if (!errors.length) {
    return {};
  }
  return errors.reduce((errorSchema, error) => {
    const { property, message } = error;
    const path = toPath(property);
    let parent = errorSchema;

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === "") {
      path.splice(0, 1);
    }

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        parent[segment] = {};
      }
      parent = parent[segment];
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message);
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }
    return errorSchema;
  }, {});
}
