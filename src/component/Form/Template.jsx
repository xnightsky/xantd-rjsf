import React from "react";
import {
  Form,
  Card,
} from "antd";


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
        <Card
          style={{
            marginBottom: 10,
          }}
        >
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
    children,
    ...restProps
  }
) => {
  // return (
  //   <SchemaField
  //     {
  //       ...{
  //         key: name,
  //         name: name,
  //         schema,
  //         registry,
  //         ...restProps,
  //       }
  //     }
  //   />
  // );
  return children;
};


export {
  DefaultFieldTemplate,
  DefaultArrayFieldTemplate,
  DefaultSchemaFieldTemplate,
}
