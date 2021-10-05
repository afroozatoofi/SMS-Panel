import React, { Component } from "react";
import { login } from "../../services/jwt.service";
import Storage from "../storage";
import { Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";
import Toast from "../toast";
import "./../../css/login.css";
import moment from "moment-jalaali";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      defaultPage: "/",
      lock: false,
      roles: [],
      token: null
    };
  }

  componentDidMount() {
    Storage.removeItem("token", "expiration");
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    login(this.state.username, this.state.password)
      .then(( data ) => {
        if (data.expiration != null) {
          Storage.setItem("expiration", moment().add(data.expiration));
        }
        if (data.token != null) {
          Toast.dismiss();
          Storage.setItem("token", data.token);
        }

        this.setState({
          loading: false,
          token: data.token
        });
      })
      .catch(() => {
        this.setState({
          password: "",
          loading: false
        });
      });
  };

  render() {
    let { token } = this.state;
    if (token) {
      return <Redirect to={this.state.defaultPage} />;
    }
    const input_btn = this.state.loading ? (
      <button className="btn btn-lg btn-bpm btn-block" disabled>
        <Spinner type="grow" color="light" />
      </button>
    ) : (
      <button className="btn btn-lg btn-bpm btn-block">Login</button>
    ); 
    return (
      <form
        onSubmit={this.handleSubmit}
        className="form-signin border rounded mx-auto  bg-light shadow mt-5"
      >
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Login
        </h1>
        <input
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
          required
          autoFocus
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          value={this.state.password}
          autoComplete="off"
          onChange={e => this.setState({ password: e.target.value })}
          required
        />
        {input_btn}
      </form>
      );
  }
}

export default Login;
