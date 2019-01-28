import _ from "lodash";
import React from "react";
import MonacoEditor from "react-monaco-editor";


function formatJSONString(value) {
  return "object" === typeof value ? JSON.stringify(
    value,
    null,
    2
  ) : value
}


function parseJSONObject(value) {
  if ("string" !== typeof value) {
    return value;
  } else {
    return JSON.parse(value);
  }
}


function JSONEditor(
  {
    value,
    onChange,
    format = formatJSONString,
    parse = parseJSONObject,
    onError,
    ...restProps
  }
) {
  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="json"
      theme="vs"
      value={format ? format(value) : value}
      onChange={
        onChange ? (newValue, e) => {
          let evalue = newValue;
          try {
            evalue = parse ? parse(evalue) : evalue;
            onChange(evalue);
            return;
          } catch (error) {
            onError && onError(error);
          }
        } : undefined
      }
      {...restProps}
    />
  );
}


const Editor = {
  JSON: JSONEditor,
};


export default Editor;
