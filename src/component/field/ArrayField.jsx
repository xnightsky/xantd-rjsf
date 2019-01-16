import _ from "lodash";
import React from "react";

import {
  getWidget,
  getDefaultRegistry,
} from "../Registry.jsx";


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
  const Widget = getWidget(schema);
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
