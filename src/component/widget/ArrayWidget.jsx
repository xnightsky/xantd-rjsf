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




class ArrayWidget extends React.Component {
  static defaultProps = {
    value: null,
    onChange: null,
    defaultItem: null,
    addable: true,
    removable: true,
    orderable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue || props.value || [],
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  itemAdd = () => {
    const { defaultItem, } = this.props;
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
      removable,
      orderable,
    } = rthis.props;
    // console.log("renderOperationPopover", element);
    return (
      <Popover
        key={`editor-${index}`}
        title={null}
        content={(
          [
            ...(
              orderable ? [
                (index > 0) ? (
                  <Button
                    key={`op-move-left`}
                    style={{
                      display: "block",
                      marginTop: 5,
                    }}
                    icon="arrow-up"
                    onClick={(e) => {
                      preventEvent(e);
                      rthis.itemMove(index, index - 1, indexLength);
                    }}
                  />
                ) : null,
                (index < indexLength - 1) ? (
                  <Button
                    key={`op-move-right`}
                    style={{
                      display: "block",
                      marginTop: 5,
                    }}
                    icon="arrow-down"
                    onClick={(e) => {
                      preventEvent(e);
                      rthis.itemMove(index, index + 1, indexLength);
                    }}
                  />
                ): null,
              ] : []
            ),
            ...(
              removable ? [
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
    )
  }

  render () {
    const {
      // value,
      onChange,
      children,
      addable,
    } = this.props;
    const {
      value: value,
    } = this.state;

    const rtValueList = value || [];
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
              return this.renderOperationPopover(rtelement, index, rtValueList.length);
            })
        }
        </div>
        {
          addable ? (
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
