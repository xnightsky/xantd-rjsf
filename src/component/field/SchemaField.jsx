import _ from "lodash";
import React from "react";

import {
  getField,
  getDefaultRegistry,
} from "../Registry.jsx";
import BaseField from "./BaseField.jsx";


class SchemaField extends BaseField {
  static defaultProps = {
    initialValue: undefined,
    schema: {},
    registry: undefined,
  };

  constructor (props) {
    super (props);
    this.state = (this.state || {});
  }

  render() {
    const {
      name,
      schema = {},
      registry = getDefaultRegistry(),
    } = this.props;
    const FieldTemplate = registry.FieldTemplate;
    const Field = getField(schema);
    return (
      <FieldTemplate
        key={name}
        name={name}
        schema={schema}
      >
        <Field
          key={name}
          name={name}
          schema={schema}
          {
            ...this.getValueProps(null, false)
          }
        >
        </Field>
      </FieldTemplate>
    );
  }
}


export default SchemaField;
