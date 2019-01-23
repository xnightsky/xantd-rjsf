import React from "react";
import ReactDOM from "react-dom";

import App from "../page/layout/App.jsx";


ReactDOM.render(<App />, document.getElementById('index'));



if(module.hot){
  module.hot.accept();
}
