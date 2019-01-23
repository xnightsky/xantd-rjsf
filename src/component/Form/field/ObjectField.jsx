import _ from "lodash";
import React from "react";
import update from "immutability-helper";

import {
  getValueFromEvent,
  // getValueFromPreventEvent,
} from "../utils.jsx";
import {
  getWidget,
  getDefaultRegistry,
} from "../Registry.jsx";
import IBaseField from "./IBaseField.jsx";


class ObjectField extends IBaseField {
  static defaultProps = {
    initialValue: undefined,
    schema: {},
    uiSchema: {},
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
    const {
      properties = {},
    } = schema;
    //
    const SchemaFieldTemplate = registry.SchemaFieldTemplate;
    const SchemaField = registry.fields.SchemaField;
    return _.map(
      properties,
      (ischema, ikey) => {
        const iuiSchema = uiSchema[ikey];
        const irestProps = {
          key: ikey,
          name: ikey,
          schema: ischema,
          uiSchema: iuiSchema,
          registry,
          ...this.getValueProps(ikey, false),
        };
        return (
          <SchemaFieldTemplate
            {...irestProps}
          >
            <SchemaField
              {...irestProps}
            />
          </SchemaFieldTemplate>
        );
      }
    );
  }
}


export default ObjectField;
