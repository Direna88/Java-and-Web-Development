//import React from "react";
import reactDom from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";


//reactDom.render(<App />, document.getElementById("root"));

reactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)