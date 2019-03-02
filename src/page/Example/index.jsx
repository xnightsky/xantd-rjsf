import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Row,
  Col,
} from "antd";

// import fields from "../../component/Form/field";
import fields from "$src/component/Form/field";
import config from "./config";
import Playground from "./Playground";


// console.log("<fields>", fields);
const SchemaField = fields.SchemaField;


const barHeight = 50;


class Example extends React.Component {
  static defaultProps = {
    defaultKey: "simple",
    // defaultKey: "array",
  };

  constructor(props) {
    super(props);
    this.state = {
      key: props.defaultKey,
      value: {
        value: null,
        ...config[props.defaultKey],
      },
    };
  }

  render () {
    const {
      key,
      value,
    } = this.state;
    return (
      <div>
        <div
          style={{
            display: "flex",
            height: barHeight,
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
                  margin: 10,
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
          style={{
            height: `calc(100vh - ${barHeight}px)`,
            overflowY: "auto",
          }}
        >
          <Col
            span={14}
            style={{
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <Playground
              style={{
                flex: 1,
              }}
              value={value}
              onChange={(value) => {
                this.setState({
                  value,
                })
              }}
            />
          </Col>
          <Col
            span={10}
            style={{
              height: "100%",
              overflowY: "auto",
            }}
          >
          {
            value ? (
              <SchemaField
                key={key}
                defaultValue={value.defaultValue}
                value={value.value}
                schema={value.schema}
                uiSchema={value.uiSchema}
                onChange={(evalue) => {
                  console.log("Example.onC", evalue);
                  this.setState(
                    update(
                      this.state,
                      {
                        value: {
                          value: {
                            $set: evalue,
                          }
                        }
                      }
                    )
                  );
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
