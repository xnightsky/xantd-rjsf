import _ from "lodash";
import React from "react";
// import update from "immutability-helper";

import {
  ajvValidate,
} from "./util.js";


export default class AjvRootValidator extends React.Component {

  renderFromProps(props = this.props) {
    const {
      schema,
      value,
      ...restProps
    } = props;
    const vresult = ajvValidate(value, schema);
    console.log("[AjvRootValidator]: vresult", vresult);
    const {
      errorSchema,
    } = vresult;
    return {
      ...props,
      errorSchema,
    };
  }

  render () {
    const { children, ...restProps } = this.renderFromProps();
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
