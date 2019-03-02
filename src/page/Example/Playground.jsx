import _ from "lodash";
import React from "react";
import {
  Row,
  Col,
  Card,
} from "antd";
import Editor from "../../component/Editor/";
import IBaseField from "../../component/Form/field/IBaseField.jsx";


const EditorPanel = ({
  value,
  onChange,
  title,
  containerProps = {},
  ...restProps
}) => {
  return (
    <div
      data-editor-container
      bordered={false}
      className="ant-card ant-card-bordered"
      {...containerProps}
    >
      <div
        className="ant-card ant-card-head"
      >
      {
        title
      }
      </div>
      {
        // autosize
      }
      <Editor.JSON
        value={value }
        onChange={onChange}
        {...restProps}
      />
    </div>
  )
}


class Playground extends IBaseField {
  static defaultProps = {
    value: {},
    onChange: null,
  };

  render () {
    const {
      value: _value,
      ...restProps
    } = this.props;
    const {
      value = {},
    } = this.state;
    const baseEditorProps = {
      containerProps: {
        style: {
          // border: "1px solid red",
          height: "30vh",
          margin: "10px",
        },
      }
    }
    return (
      <div
        {...restProps}
      >
        <EditorPanel
          {...baseEditorProps}
          title="schema"
          value={this.attrGetter("schema")()}
          onChange={this.attrSetter("schema")}
        />
        <Row>
          <Col
            span={12}
          >
            <EditorPanel
            {...baseEditorProps}
              title="uiSchema"
              value={this.attrGetter("uiSchema")()}
              onChange={this.attrSetter("uiSchema")}
            />
          </Col>
          <Col
            span={12}
          >
            <EditorPanel
              {...baseEditorProps}
              title="data"
              value={
                this.attrGetter("value")()
                  || this.attrGetter("defaultValue")()
              }
              onChange={this.attrSetter("value")}
            />
          </Col>
        </Row>
      </div>
    )
  }
}


export default Playground;
