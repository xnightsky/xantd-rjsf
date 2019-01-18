import _ from "lodash";
import React from "react";

import {
  getWidget,
  getDefaultRegistry,
} from "../Registry.jsx";
import {
  isMultipleChoices,
  toEnumOptions,
} from "../schemaUtils.jsx"


function ArrayField(props) {
  const {
    schema,
    registry = getDefaultRegistry(),
    ...restProps
  } = props;
  const {
    items,
  } = schema
  //
  const enumOptions = isMultipleChoices(schema) ? toEnumOptions(schema.items) : {}
  if (!_.isEmpty(enumOptions)) {
    const Widget = getWidget(schema, "checkbox");
    return (
      <Widget
        schema={schema}
        options={{
          ...enumOptions,
        }}
        {...restProps}
      />
    );
  }
  //
  const Widget = getWidget(schema, "default");
  const SchemaFieldTemplate = registry.SchemaFieldTemplate;
  return (
    <Widget
      schema={schema}
      options={{}}
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


export default ArrayField;
