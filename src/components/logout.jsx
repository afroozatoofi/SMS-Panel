import { Component } from "react";
import Storage from "./storage";
import Toast from "./toast";

class Logout extends Component {
  async componentDidMount() {
    await Storage.removeItem("expiration");
    await Storage.removeItem("token");
    Toast.dismiss();
    this.props.history.replace("login");
  }

  render() {
    return null;
  }
}

export default Logout;
