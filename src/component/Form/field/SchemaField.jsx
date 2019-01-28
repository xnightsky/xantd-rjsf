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


class SchemaField extends IBaseField {
  static defaultProps = {
    schema: {},
    uiSchema: {},
    initialValue: undefined,
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
