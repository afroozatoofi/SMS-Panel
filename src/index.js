import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/toastify.css";
import "./css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/page/login";
import Logout from "./components/logout";
import { BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";
import { ToastContainer, ToastPosition, cssTransition } from "react-toastify";
import App from "./App";
import NotFound from "./components/page/not-found";
import * as serviceWorker from "./serviceWorker";
import Storage from "./components/storage";
import packageJson from "../package.json";

const Flip = cssTransition({
  enter: "Toastify__flip-enter",
  exit: "Toastify__flip-exit",
  duration: [750, 0]
});
ReactDOM.render(
  <div>
    <ToastContainer      
      position={ToastPosition.BOTTOM_RIGHT}
      autoClose={15000}
      transition={Flip}
    />
    <BrowserRouter basename={packageJson.homepage + "/"}>
      <Switch>
      <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/not-found" component={NotFound} />
        <Route
          path="/"
          render={() => {
            let token = Storage.getItem("token");
            if (token) {
              return <App />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
