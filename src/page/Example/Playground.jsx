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
  containerStyle = {}, ...restProps
}) => {
  return (
    <Card
      title={title}
      bordered={false}
    >
      <div
        data-editor-container
        style={{
          ...containerStyle
        }}
      >
      {
        // autosize
      }
        <Editor.JSON
          value={value }
          onChange={onChange}
          {...restProps}
        />
      </div>
    </Card>
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
    return (
      <div
        {...restProps}
      >
        <EditorPanel
          containerStyle={{
            height: 240,
          }}
          title="schema"
          value={this.attrGetter("schema")()}
          onChange={this.attrSetter("schema")}
        />
        <Row>
          <Col
            span={12}
          >
            <EditorPanel
              containerStyle={{
                height: 240,
              }}
              title="uiSchema"
              value={this.attrGetter("uiSchema")()}
              onChange={this.attrSetter("uiSchema")}
            />
          </Col>
          <Col
            span={12}
          >
            <EditorPanel
              containerStyle={{
                height: 240,
              }}
              title="data"
              value={
                this.attrGetter("value")()
                  || this.attrGetter("initialValue")()
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
