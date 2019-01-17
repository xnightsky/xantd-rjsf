import React from "react";
import {
  Form,
  Card,
} from "antd";

import SchemaField from "./field/SchemaField.jsx";


const DefaultFieldTemplate = (props) => {
  const {
    name,
    schema,
    children,
  } = props;
  const {
    title,
    // type,
  } = schema;
  return (
    <Form.Item
      label={title || name}
    >
      {
        // ((type_) => {
        //   switch(type_) {
        //     case "object":
        //       return (
        //         <Card>
        //         {
        //           children
        //         }
        //         </Card>
        //       )
        //     default:
        //       return children;
        //   }
        // })(type)
      }
      {
        children
      }
    </Form.Item>
  );
};


const DefaultArrayFieldTemplate = ({
  schema,
  children,
}) => {
  switch (schema && schema.type) {
    case "object":
      return (
        <Card>
        {
          children
        }
        </Card>
      );
    default:
      return children;
  }
};


const DefaultSchemaFieldTemplate = (
  {
    name,
    schema,
    registry,
    ...restProps
  }
) => {
  return (
    <SchemaField
      {
        ...{
          key: name,
          name: name,
          schema,
          registry,
          ...restProps,
        }
      }
    />
  );
};


export {
  DefaultFieldTemplate,
  DefaultArrayFieldTemplate,
  DefaultSchemaFieldTemplate,
}
