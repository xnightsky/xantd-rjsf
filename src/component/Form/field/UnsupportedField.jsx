import React from "react";
// import PropTypes from "prop-types";


function UnsupportedField({ schema, }) {
  return (
    <div>
      <p>
        {
          `不支持该类型: ${name} - ${schema.type}`
        }
      </p>
      {
        schema && <pre>{JSON.stringify(schema, null, 2)}</pre>
      }
    </div>
  );
}


export default UnsupportedField;
