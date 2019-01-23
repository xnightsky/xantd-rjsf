import _ from "lodash";
import React from "react";
import {
  Row,
  Col,
} from "antd";

import SchemaField from "$src/component/Form/field/SchemaField.jsx";
import config from "./config";
import Playground from "./Playground.jsx";


class Example extends React.Component {
  static defaultProps = {
    defaultKey: "simple",
    // defaultKey: "array",
  };

  constructor(props) {
    super(props);
    this.state = {
      key: props.defaultKey,
      value: config[props.defaultKey],
    };
  }

  render () {
    const {
      key,
      value,
    } = this.state;
    const cfgProps = value;
    return (
      <div>
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
                    key: ikey,
                    value: config[ikey],
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
        <br />
        <br />
        </div>
        <Row
          type="flex"
          justify="center"
        >
          <Col
            span={14}
            style={{
              height: "100%",
            }}
          >
            <Playground
              style={{
                flex: 1,
              }}
              value={value}
            />
          </Col>
          <Col
            span={10}
            style={{
              // margin: "0 auto",
            }}
          >
          {
            cfgProps ? (
              <SchemaField
                key={key}
                initialValue={cfgProps.initialValue}
                schema={cfgProps.schema}
                uiSchema={cfgProps.uiSchema}
                onChange={(e) => {
                  console.log("onC", e);
                }}
              />
            ) : null
          }
          </Col>
        </Row>
      </div>
    )
  }
}


export default Example;
