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
    // type,
    title,
    description,
  } = schema;
  const rtTitle = title || name;
  const itemProps = {
    ...(
      rtTitle ? {
        label: (
          <strong>
          {
            rtTitle
          }
          </strong>
        ),
      } : {}
    )
  };

  return (
    <Form.Item
      {...itemProps}
    >
      {
        description
      }
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
    children,
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
