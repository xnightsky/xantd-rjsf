import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import {
  fieldPropTypes,
} from "../baseTypes.jsx";
import {
  getField,
  getDefaultRegistry,
} from "../Registry.jsx";
import IBaseField from "./IBaseField.jsx";
import {
  toDefault,
} from "../schemaUtils.jsx"


class SchemaField extends IBaseField {
  static defaultProps = {
    schema: {},
    uiSchema: {},
    defaultValue: undefined,
    registry: undefined,
  };

  constructor (props) {
    super (props);
    this.state = (this.state || {});
  }

  render() {
    const {
      name,
      schema,
      uiSchema,
      registry = getDefaultRegistry(),
      defaultValue,
    } = this.props;
    const Field = getField(schema);
    const FieldTemplate = registry.FieldTemplate;
    return (
      <FieldTemplate
        key={name}
        name={name}
        schema={schema}
        uiSchema={uiSchema}
      >
        <Field
          key={name}
          name={name}
          schema={schema}
          uiSchema={uiSchema}
          {
            // ...this.getValueProps(null, false)
            ...this.getValueProps(null, true)
          }
          defaultValue={undefined != defaultValue ? defaultValue : toDefault(schema)}
        >
        </Field>
      </FieldTemplate>
    );
  }
}

SchemaField.propTypes = {
  ...fieldPropTypes,
};

export default SchemaField;
