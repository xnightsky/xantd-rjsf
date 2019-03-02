import _ from "lodash";
import React from "react";
// import update from "immutability-helper";

import { verbose, } from "../gconfig.jsx";
import {
  getDefaultRegistry,
} from "../Registry.jsx";
import IBaseField from "./IBaseField.jsx";
import {
  FNValve,
} from "../utils.jsx";



class ObjectField extends IBaseField {
  static defaultProps = {
    defaultValue: undefined,
    schema: {},
    uiSchema: {},
    registry: undefined,
  };

  constructor (props) {
    super (props);
    this.state = (this.state || {});
    // refactor: {{
    this._rawTriggerChange = this.triggerChange;
    this._debounceTriggerChange = FNValve.debounceOnRAF({
      fn: this.triggerChange,
    });
    this.triggerChange = this._debounceTriggerChange;
    // }}
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.value, this.props.value)) {
      verbose > 0 && console.log("ObjectField.componentWillReceiveProps: !=", nextProps.value, this.props.value);
      this.setState({
        value: nextProps.value,
      });
    }
  }

  render() {
    const {
      name,
      schema,
      uiSchema,
      registry = getDefaultRegistry(),
      defaultValue = {},
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
        const iDefaultValue = defaultValue[ikey];
        const irestProps = {
          key: ikey,
          name: ikey,
          schema: ischema,
          uiSchema: iuiSchema,
          registry,
          ...this.getValueProps(ikey, false),
          defaultValue: iDefaultValue,
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
