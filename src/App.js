import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./forms/main";
import "simple-react-validator/dist/locale/fa";
import Header from "./components/layout/header";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="cover-spin" style={{ display: "block" }}></div>
        <div>
          { <Header /> }
          <div className="wrapper">
            <main role="main" className="col-12 ml-md-auto pl-1 ml-auto">
              <Switch>
                <Route path={"/"} exact component={Main} />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
