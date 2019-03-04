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
    errorSchema: {},
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
      errorSchema = {},
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
        // INFO: defaultValue 转换到 value, 不再下放
        // const idefaultValue = defaultValue[ikey];
        const ierrorSchema = errorSchema[ikey];
        const irestProps = {
          key: ikey,
          name: ikey,
          schema: ischema,
          uiSchema: iuiSchema,
          registry,
          ...this.getValueProps(ikey, false),
          // defaultValue: idefaultValue,
          errorSchema: ierrorSchema,
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
