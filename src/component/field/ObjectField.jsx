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
import BaseField from "./BaseField.jsx";


class ObjectField extends BaseField {
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
    const {
      properties = {},
    } = schema;
    //
    const SchemaFieldTemplate = registry.SchemaFieldTemplate;
    // const Widget = getWidget(schema);
    return _.map(
      properties,
      (ischema, ikey) => {
        return (
          <SchemaFieldTemplate
            {
              ...{
                key: ikey,
                name: ikey,
                schema: ischema,
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
