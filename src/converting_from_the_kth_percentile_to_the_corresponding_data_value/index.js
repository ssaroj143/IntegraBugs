import "react-app-polyfill/ie11"; //added pollyfill suppourt  latest ES feature in IE11
import "react-app-polyfill/stable"; //added pollyfill to suppourt all stable ES features across browser.
import React from "react";
import ReactDOM from "react-dom";
import { StyleObserverProvider } from '../app/helpers/StyleObserverContext'
import App from "./app";

require("webpack-jquery-ui");
require("jquery-ui-touch-punch");
const MainApp = () => {
  return (
    <>
      <StyleObserverProvider />
      <App />
    </>
  );
};

ReactDOM.render(<MainApp />, document.querySelector("#root"));