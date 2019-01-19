import _ from "lodash";
import React from "react";
import update from "immutability-helper";
import {
  Popover,
  Button,
  // Divider,
} from "antd";

import {
  // getValueFromEvent,
  // getValueFromPreventEvent,
  preventEvent, getValueFromPreventEvent,
} from "../utils.jsx";




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
    minLength,
    defaultItem,
  } = getOptionsWithProps(props);
  let rtValueList = value || [];
  let rtValueLength = rtValueList.length;
  if (minLength && rtValueLength < minLength) {
    // return new array
    return _.assign(_.fill(new Array(minLength), defaultItem), rtValueList)
  }
  return rtValueList;
}


class ArrayWidget extends React.Component {
  static defaultProps = {
    value: null,
    onChange: null,
    defaultItem: null,
    options: getOptionsWithProps({}),
  };

  constructor(props) {
    super(props);
    this.state = {
      value: normalizeValueWithProps(
        props.initialValue || props.value || [],
        props
      ),
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setState({
        value: normalizeValueWithProps(
          nextProps.value,
          nextProps
        ),
      });
    }
  }

  itemAdd = () => {
    const {
      defaultItem,
    } = this.props;
    this.setState(
      update(
        this.state,
        {
          value: {
            $push: [defaultItem],
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
      // options,
    } = rthis.props;
    const {
      removable,
      orderable,
    } = getOptionsWithProps(this.props);
    const rtRemovable = isAble(removable, index, indexLength);
    const rtOrderable = isAble(orderable, index, indexLength);
    // console.log("renderOperationPopover", element);
    if (!rtRemovable && !rtOrderable) {
      return element;
    } else {
      return (
        <Popover
          key={`editor-${index}`}
          title={null}
          content={renderOperationPanel()}
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

    function renderOperationPanel() {
      return [
        ...(
          rtOrderable ? [
            (
              <Button
                key={`op-move-left`}
                style={{
                  display: "block",
                  marginTop: 5,
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
                  display: "block",
                  marginTop: 5,
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
                  display: "block",
                  marginTop: 5,
                  background: "#c0341d",
                  border: "#a62d19",
                  color: "#fff",
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
      value: value,
    } = this.state;

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
