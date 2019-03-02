import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Popover,
  Button,
  // Divider,
  Row,
  Col,
} from "antd";

import { verbose, } from "../gconfig.jsx";
import {
  preventEvent,
  getValueFromPreventEvent,
} from "../utils.jsx";
import {
  getWidgetValueProps,
  triggerWidgetDefaultValue,
} from "../../QuickBinder.jsx";


function getOptionsWithProps (props) {
  const {
    options: {
      addable = true,
      removable = true,
      orderable = true,
      ...restOptions
    } = {},
  } = props;
  return {
    addable,
    removable,
    orderable,
    ...restOptions,
  }
}

function isAble(anyable, ...args) {
  return "function" === typeof anyable ? anyable(...args) : anyable;
}


function normalizeValueWithProps(value, props) {
  const {
    minItems,
    additionalDefault,
  } = getOptionsWithProps(props);
  let rtValueList = value || [];
  let rtValueLength = rtValueList.length;
  if (minItems && rtValueLength < minItems) {
    // return new array
    return _.assign(_.fill(new Array(minItems), additionalDefault), rtValueList)
  }
  return rtValueList;
}


class ArrayWidget extends React.Component {
  static defaultProps = {
    value: undefined,
    onChange: null,
    format: (v) => {
      return v ? v : [];
    },
    options: getOptionsWithProps({}),
    itemOperation: {
      layout: "popover",
      // layout: "toolbar",
    },
  };

  constructor(props) {
    super(props);
    const rtProps = getWidgetValueProps(
      {
        value: props.value,
        onChange: props.onChange,
        defaultValue: props.defaultValue,
        format: props.format,
      }
    );
    rtProps.value = normalizeValueWithProps(rtProps.value, props);
    this.state = {
      ...rtProps,
    };
    triggerWidgetDefaultValue(this.state, props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      verbose > 0 && console.log("ArrayWidget.componentWillReceiveProps!=", nextProps.value, this.props.value);
      const rtProps = getWidgetValueProps(
        {
          value: nextProps.value,
          onChange: nextProps.onChange,
          defaultValue: nextProps.defaultValue,
          format: nextProps.format,
        }
      );
      rtProps.value = normalizeValueWithProps(rtProps.value, nextProps);
      this.setState({
        ...rtProps,
      });
      // triggerWidgetDefaultValue(this.state, nextProps);
    }
  }

  itemAdd = () => {
    const {
      additionalDefault,
    } = getOptionsWithProps(this.props);
    this.setState(
      update(
        this.state,
        {
          value: {
            $push: [additionalDefault],
          },
        }
      ),
      this.triggerChange,
    );
  }
  itemSet = (newValue, index) => {
    this.setState(
      update(
        this.state,
        {
          value: {
            [index]: {
              $set: newValue,
            }
          },
        }
      ),
      this.triggerChange,
    );
  }
  itemRemove = (index) => {
    this.setState(
      update(
        this.state,
        {
          value: {
            $splice: [[index, 1,]],
          },
        }
      ),
      this.triggerChange,
    );
  }
  itemMove = (index, newIndex, indexLength) => {
    if (newIndex < 0 || newIndex >= indexLength) {
      console.warn("ArrayWidget move fialure!");
      return
    }
    const indexValue = this.state.value[index];
    const newIndexValue = this.state.value[newIndex];
    this.setState(
      update(
        this.state,
        {
          value: {
            [index]: {
              $set: newIndexValue,
            },
            [newIndex]: {
              $set: indexValue,
            },
          },
        }
      ),
      this.triggerChange,
    );
  }

  triggerChange = (value = this.state.value) => {
    const { onChange, } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  renderOperationPopover(element, index, indexLength) {
    const rthis = this;
    const {
      itemOperation: {
        layout,
      } = {},
      // options,
    } = rthis.props;
    const {
      removable,
      orderable,
      minItems = 0,
    } = getOptionsWithProps(this.props);
    const rtRemovable = minItems < indexLength
      && isAble(removable, index, indexLength)
    ;
    const rtOrderable = isAble(orderable, index, indexLength);
    // console.log("renderOperationPopover", element);
    if (!rtRemovable && !rtOrderable) {
      return element;
    } else {
      switch (layout) {
        case "toolbar":
            return (
              <Row type="flex">
                <Col
                  style={{
                    flex: 1,
                  }}
                  data-list-item-wrapper
                >
                {
                  element
                }
                </Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                {
                  renderOperationPanel(
                    {
                      // display: "inline-block",
                      display: "block",
                      marginTop: 5,
                    }
                  )
                }
                </Col>
              </Row>
            );
        case "popover":
        default:
          return (
            <Popover
              key={`editor-${index}`}
              title={null}
              content={renderOperationPanel(
                {
                  display: "block",
                  marginTop: 5,
                }
              )}
              trigger="hover"
              placement="left"
            >
            <div data-list-item-wrapper>
            {
              element
            }
            </div>
            </Popover>
          );
        }
    }

    function renderOperationPanel(itemStyle = {}) {
      return [
        ...(
          rtOrderable ? [
            (
              <Button
                key={`op-move-left`}
                style={{
                  ...itemStyle,
                }}
                icon="arrow-up"
                disabled={!(
                  index > 0
                    && isAble(orderable, index - 1, indexLength)
                )}
                onClick={(e) => {
                  preventEvent(e);
                  rthis.itemMove(index, index - 1, indexLength);
                }}
              />
            ),
            (
              <Button
                key={`op-move-right`}
                style={{
                  ...itemStyle,
                }}
                icon="arrow-down"
                disabled={!(
                  index < indexLength - 1
                )}
                onClick={(e) => {
                  preventEvent(e);
                  rthis.itemMove(index, index + 1, indexLength);
                }}
              />
            ),
          ] : []
        ),
        ...(
          rtRemovable ? [
            (
              <Button
                key={`op-remove`}
                style={{
                  background: "#c0341d",
                  border: "#a62d19",
                  color: "#fff",
                  ...itemStyle,
                }}
                icon="delete"
                onClick={(e) => {
                  preventEvent(e);
                  rthis.itemRemove(index);
                }}
              />
            )
          ] : []
        ),
      ]
    }
  }

  render () {
    const {
      // value,
      onChange,
      children,
      // options,
    } = this.props;
    const {
      addable,
    } = getOptionsWithProps(this.props);
    const {
      value,
    } = this.state;
    //
    const rtValueList = value || [];
    const rtValueLength = rtValueList.length;
    return (
      <div>
        <div>
        {
          (rtValueList).map((ivalue, index) => {
              let rtelement = "function" === typeof children
                ? children(
                  {
                    key: index,
                    value: ivalue,
                    onChange: (e) => {
                      const evalue = getValueFromPreventEvent(e);
                      this.itemSet(evalue, index);
                    },
                  },
                  index
                )
                : React.cloneElement(
                  children,
                  {
                    key: index,
                    value: ivalue,
                    onChange: (e) => {
                      const evalue = getValueFromPreventEvent(e);
                      this.itemSet(evalue, index);
                    },
                  }
                )
              ;
              return this.renderOperationPopover(rtelement, index, rtValueLength);
            })
        }
        </div>
        {
          isAble(addable, rtValueLength, rtValueLength) ? (
            <div>
              <Button
                key={`op-add`}
                icon="plus"
                onClick={this.itemAdd}
              >
              </Button>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default ArrayWidget;
