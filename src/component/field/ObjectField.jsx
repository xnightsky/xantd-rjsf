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
    // const Widget = getWidget(schema);
    return _.map(
      properties,
      (ischema, ikey) => {
        const iuiSchema = uiSchema[ikey];
        return (
          <SchemaFieldTemplate
            {
              ...{
                key: ikey,
                name: ikey,
                schema: ischema,
                uiSchema: iuiSchema,
                registry,
                ...this.getValueProps(ikey, false),
              }
            }
          >
            {/* <Widget /> */}
          </SchemaFieldTemplate>
        );
      }
    );
  }
}


export default ObjectField;
