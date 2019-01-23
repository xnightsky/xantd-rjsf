import _ from "lodash";
import React from "react";
import {
  Row,
  Col,
  Card,
} from "antd";
import Editor from "../../component/Editor/";


const EditorCard = ({
  title, value, containerStyle = {}, ...restProps
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
        <Editor
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
      </div>
    </Card>
  )
}


class Playground extends React.Component {
  static defaultProps = {
    value: {},
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

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
        <EditorCard
          containerStyle={{
            height: 240,
          }}
          title="schema"
          value={value.schema}
        />
        <Row>
          <Col
            span={12}
          >
            <EditorCard
              containerStyle={{
                height: 240,
              }}
              title="uiSchema"
              value={value.uiSchema}
            />
          </Col>
          <Col
            span={12}
          >
            <EditorCard
              containerStyle={{
                height: 240,
              }}
              title="data"
              value={value.initialValue}
            />
          </Col>
        </Row>
      </div>
    )
  }
}


export default Playground;
