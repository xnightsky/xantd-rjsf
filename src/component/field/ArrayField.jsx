import _ from "lodash";
import React from "react";

import {
  getWidget,
  getDefaultRegistry,
} from "../Registry.jsx";
import {
  toInitialValue,
  isMultipleChoices,
  toEnumOptions,
  isFixedArray,
} from "../schemaUtils.jsx"


function renderDefaultArrayField(props) {
  const {
    schema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const {
    items,
  } = schema
  //
  const Widget = getWidget(schema, "default");
  const SchemaFieldTemplate = registry.SchemaFieldTemplate;
  return (
    <Widget
      schema={schema}
      options={{
        minItems: schema.minItems,
      }}
      initialValue={toInitialValue(schema)}
      {...restProps}
    >
    {
      (itemProps, index) => {
        const ikey = `${index}`;
        return (
          <SchemaFieldTemplate
            {
              ...{
                key: ikey,
                name: ikey,
                schema: items,
                registry: getDefaultRegistry(
                  {
                    // array 列表需要定制 Template
                    FieldTemplate: registry.ArrayFieldTemplate,
                  }
                ),
                ...itemProps,
              }
            }
          />
        );
      }
    }
    </Widget>
  );
}


function renderUniqueEnumArrayField(props, options = {}) {
  const {
    schema,
    // registry = getDefaultRegistry(),
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
        initialValue={toInitialValue(schema)}
        {...restProps}
      />
    );
}


function renderFixedArray(props) {
  const {
    schema,
    registry = getDefaultRegistry(),
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
  //
  const Widget = getWidget(schema, "default");
  const SchemaFieldTemplate = registry.SchemaFieldTemplate;
  return (
    <Widget
      schema={schema}
      options={{
        addable,
        removable: fixable,
        orderable: fixable,
        minLength: itemSchemaListLength,
      }}
      initialValue={toInitialValue(schema)}
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
        return (
          <div key={`array-item-${index}`}>
            <SchemaFieldTemplate
              {
                ...{
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
                }
              }
            />
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
