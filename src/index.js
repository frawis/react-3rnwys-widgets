import React from "react";
import ReactDOM from "react-dom";
// Find all widget divs
const WidgetDivs = document.querySelectorAll(".br_coin_widget");

import App from "./App";

WidgetDivs.forEach(Div => {
  ReactDOM.render(
    <React.StrictMode>
      <App domElement={Div} />
    </React.StrictMode>,
    Div
  );
});
