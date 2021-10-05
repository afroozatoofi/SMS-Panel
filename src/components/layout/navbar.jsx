import React, { Component } from "react";
import { Link } from "react-router-dom";
import Storage from "../storage";
import "./../../css/navbar.css";
import moment from "moment-jalaali";
// import $ from "jquery";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      expiration: "",
      expirationTime: moment(Storage.getItem("expiration")).format("X"),
      interval: null,
      diff: null
    };
  }

  calcExpiration = interval => {
    let current = moment().format("X");
    if (current <= this.state.expirationTime) {
      let diff = this.state.expirationTime - current;
      diff = moment()
        .startOf("day")
        .seconds(diff)
        .format("HH:mm:ss");
      this.setState({ diff });
    } else {
      if (interval !== null) {
        clearInterval(interval);
      }
    }
  };
  async componentDidMount() {
    if (this.props.expiration) {
      this.calcExpiration();
      const interval = setInterval(() => {
        this.calcExpiration(interval);
      }, 1000);
      this.setState({ interval });
    }
  }

  toggleMenu = () => {
    // let open = $("body").hasClass("sidebar-open");
    let open = document
      .querySelector("body")
      .classList.contains("sidebar-open");
    if (open) {
      // $("body").removeClass("sidebar-open");
      document.querySelector("body").classList.remove("sidebar-open");
    } else {
      // $("body").addClass("sidebar-open");
      document.querySelector("body").classList.add("sidebar-open");
    }
  };

  componentWillUnmount() {
    if (this.props.expiration) {
      clearInterval(this.state.interval);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <div className="col-12">
          <Link className="menu-bar" to="#" onClick={this.toggleMenu}>
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
          </Link>
          <div className="p-2 float-right text-white navbar-text">
            {/* <i className="fa fa-fire"></i>&nbsp; */}
            {user.userName}
            {user.role ? " - " + user.role : ""}
            {this.props.expiration && this.state.diff && (
              <React.Fragment>
                &nbsp;&nbsp;
                <span className="expiration-time">
                  {"|"}
                  &nbsp;&nbsp;
                  {"زمان باقی مانده  "}
                  {this.state.diff}
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
