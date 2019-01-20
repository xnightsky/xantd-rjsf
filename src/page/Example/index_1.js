import _ from "lodash";
import React from "react";
import {
} from "antd";

import SchemaField from "$src/component/field/SchemaField.jsx";
import config from "./config";


class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // current: "simple",
      current: "array",
    };
  }

  render () {
    const {
      current,
    } = this.state;
    const cfgProps = config[current];
    return (
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
        {
          Object.keys(config).map((ikey) => {
            return (
              <a
                key={ikey}
                href="javascript: void(0);"
                onClick={() => {
                  this.setState({
                    current: ikey,
                  })
                }}
                style={{
                  display: "block",
                  minWidth: 120,
                }}
              >
                {
                  ikey
                }
              </a>
            )
          })
        }
        </div>
        <br />
        <br />
        <br />
        {
          cfgProps ? (
            <SchemaField
              key={current}
              initialValue={cfgProps.initialValue}
              schema={cfgProps.schema}
              onChange={(e) => {
                console.log("onC", e);
              }}
            />
          ) : null
        }
      </div>
    )
  }
}


export default Example;
