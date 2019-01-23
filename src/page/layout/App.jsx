import React, { Component } from 'react';
import {
  Alert,
} from "antd";

import Example from "../Example";


class App extends Component {
    render() {
        return (
            <div className="App">
              {/* <Alert message="hello, react-json-schema-form" type="success" /> */}
              <Example />
            </div>
        );
    }
}


export default App;
