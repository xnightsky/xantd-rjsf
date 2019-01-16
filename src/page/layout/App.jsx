import React, { Component } from 'react';
import {
  Alert,
} from "antd";

import Demo from "../Demo.jsx";


class App extends Component {
    render() {
        return (
            <div className="App">
              <Alert message="hello, react-json-schema-form" type="success" />
              <br />
              <Demo />
            </div>
        );
    }
}


export default App;
