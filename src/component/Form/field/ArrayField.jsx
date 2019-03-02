import _ from "lodash";
import React from "react";

import {
  getWidget,
  getDefaultRegistry,
  getUiOptions,
} from "../Registry.jsx";
import {
  toDefault,
  isMultipleChoices,
  toEnumOptions,
  isFixedArray,
} from "../schemaUtils.jsx";


function renderDefaultArrayField(props) {
  const {
    schema,
    uiSchema,
    registry = getDefaultRegistry(),
    defaultValue,
    ...restProps
  } = props;
  const {
    items,
  } = schema
  //
  const Widget = getWidget(schema, "default");
  const SchemaFieldTemplate = registry.SchemaFieldTemplate;
  const SchemaField = registry.fields.SchemaField;
  return (
    <Widget
      schema={schema}
      options={{
        minItems: schema.minItems,
      }}
      defaultValue={undefined != defaultValue ? defaultValue : toDefault(schema)}
      {...restProps}
    >
    {
      (itemProps, index) => {
        const ikey = `${index}`;
        const iuiSchema = uiSchema[ikey];
        const irestProps = {
          key: ikey,
          name: ikey,
          schema: items,
          uiSchema: iuiSchema,
          registry: getDefaultRegistry(
            {
              // array 列表需要定制 Template
              FieldTemplate: registry.ArrayFieldTemplate,
            }
          ),
          ...itemProps,
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
    }
    </Widget>
  );
}


function renderUniqueEnumArrayField(props, options = {}) {
  const {
    schema,
    uiSchema,
    // registry = getDefaultRegistry(),
    defaultValue,
    ...restProps
  } = props;
  const Widget = getWidget(schema, "checkbox");
    return (
      <Widget
        schema={schema}
        options={{
          ...options,
          minItems: schema.minItems,
        }}
        defaultValue={undefined != defaultValue ? defaultValue : toDefault(schema)}
        {...restProps}
      />
    );
}


function renderFixedArray(props) {
  const {
    schema,
    uiSchema,
    registry = getDefaultRegistry(),
    defaultValue,
    ...restProps
  } = props;
  const {
    items: itemSchemaList,
    additionalItems,
  } = schema
  const itemSchemaListLength = itemSchemaList.length;
  const fixable = function (index) {
    return index >= itemSchemaListLength;
  }
  const addable = !_.isEmpty(additionalItems);
  const {
    widget: widgetName = "default",
    ...options
  } = getUiOptions(uiSchema);
  //
  const Widget = getWidget(schema, widgetName);
  const SchemaFieldTemplate = registry.SchemaFieldTemplate;
  const SchemaField = registry.fields.SchemaField;
  return (
    <Widget
      options={{
        ...options,
        addable,
        removable: fixable,
        orderable: fixable,
        minLength: itemSchemaListLength,
      }}
      defaultValue={undefined != defaultValue ? defaultValue : toDefault(schema)}
      {...restProps}
    >
    {
      (itemProps, index) => {
        const ikey = `${index}`;
        const iItemSchema = index < itemSchemaListLength
          ? itemSchemaList[index]
          : additionalItems
        ;
        if (!iItemSchema) {
          console.warn("[ArrayField]: additionalItems 未配置，但是依然能添加元素!")
          return null;
        }
        const irestProps = {
          key: ikey,
          name: ikey,
          schema: iItemSchema,
          registry: getDefaultRegistry(
            {
              // array 列表需要定制 Template
              FieldTemplate: registry.ArrayFieldTemplate,
            }
          ),
          ...itemProps,
        };
        return (
          <div key={`array-item-${index}`}>
            <SchemaFieldTemplate
              {...irestProps}
            >
              <SchemaField
                {...irestProps}
              />
            </SchemaFieldTemplate>
          </div>
        );
      }
    }
    </Widget>
  );
}


function ArrayField(props) {
  const {
    schema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  //
  const enumOptions = isMultipleChoices(schema) ? toEnumOptions(schema.items) : {}
  if (!_.isEmpty(enumOptions)) {
    return renderUniqueEnumArrayField(
      props,
      enumOptions,
    );
  }
  if (isFixedArray(schema)) {
    return renderFixedArray(props);
  }
  //
  return renderDefaultArrayField(props);
}


export default ArrayField;
