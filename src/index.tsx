import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {getWorkers, Main} from "./Main";
import * as serviceWorker from "./serviceWorker";

// async function Main() {
//   const response = await axios.get("http://localhost:8123/");
//   return (
//     <div><h6>Hello World {response.status}</h6></div>
//   );
// }

getWorkers().then((workers) =>
  ReactDOM.render(<Main workers={workers}/>, document.getElementById("root")));
// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
