import _ from "lodash";
import React from "react";
import MonacoEditor from "react-monaco-editor";


function Editor(
  {
    value,
    ...restProps
  }
) {
  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="json"
      theme="vs"
      value={
        "object" === typeof value ? JSON.stringify(
          value,
          null,
          2
        ) : value
      }
      onChange={null}
      {...restProps}
    />
  );
}


export default Editor;
