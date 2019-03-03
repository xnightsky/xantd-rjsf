import _ from "lodash";
import React from "react";
// import update from "immutability-helper";

import {
  ajvValidate,
} from "./util.js";


export default class AjvRootValidator extends React.Component {

  getStateFromProps() {
    const {
      schema,
      value,
      ...restProps
    } = this.props;
    return {
      schema,
      value,
    };
  }

  render () {
    const { children, ...restProps } = this.props;
    if (children) {
      return React.cloneElement(
        children,
        restProps,
      );
    } else {
      return children;
    }
  }
}
