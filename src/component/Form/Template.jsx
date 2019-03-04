import React from "react";
import {
  Card,
  Row,
  Col,
} from "antd";


function renderErrorList(errorSchema) {
  if (errorSchema && errorSchema.__errors) {
    return errorSchema.__errors.map((ierr) => {
      return (
        <div
          style={{
            color: "red",
          }}
        >
        {
          `${ierr}`
        }
        </div>
      );
    })
  } else {
    return null
  }
}


const DefaultFieldTemplate = (props) => {
  const {
    children,
    name,
    schema,
    errorSchema,
  } = props;
  const {
    // type,
    title,
    description,
  } = schema;
  const rtTitle = title || name;
  return [
    description,
    <Row>
      {
        rtTitle ? (
          <Col>
            <strong>
            {
              rtTitle
            }
            :
            </strong>
          </Col>
        ) : null
      }
      <Col>
      {
        children
      }
      {
        renderErrorList(errorSchema)
      }
      </Col>
    </Row>
  ];
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
};


const DefaultArrayFieldTemplate = ({
  children,
  schema,
  errorShema,
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
    children,
    name,
    schema,
    registry,
    errorShema,
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
