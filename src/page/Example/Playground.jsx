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
  containerProps: {
    style = {},
    ...containerRestProps
  } = {},
  ...restProps
}) => {
  return (
    <div
      data-editor-container
      bordered={false}
      className="ant-card ant-card-bordered"
      style={{
        overflow: "hidden",
        ...style,
      }}
      {...containerRestProps}
    >
      <div
        className="ant-card-head"
        style={{
          height: 27,
          minHeight: 27,
        }}
      >
      {
        title
      }
      </div>
      <div
        className="ant-card-body"
        style={{
          height: "calc(100% - 27px)",
          padding: 0,
        }}
      >
        <Editor.JSON
          value={value }
          onChange={onChange}
          {...restProps}
        />
      </div>
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
          height: "45vh",
          margin: "5px",
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
