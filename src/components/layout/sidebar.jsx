import React, { Component } from "react";
import Storage from "./../storage";
import { listUserMenus } from "../../services/common.service";
import SidebarItem from "./sidebar-item";
import "./../../css/sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      iterables: [],
      filtered: [],
      search: ""
    };
  }
  async componentDidMount() {
    let role = Storage.getItem("role");
    let { data: items } = await listUserMenus(role);
    items = this.prepend(
      { id: "0", name: "صفحه اصلی", path: "", icon: "fa fa-home", type: "2" },
      items
    );
    let iterables = [];
    if (this.props.search) {
      iterables = this.toIterable(items);
      // iterables = this.convertNames(iterables);
    }
    this.setState({ items: items, iterables: iterables });
  }

  replaceAll = function(target, search, replacement) {
    return target.replace(new RegExp(search, "g"), replacement);
  };

  toPersianCharacter = string => {
    var obj = {
      ك: "ک",
      ي: "ی"
    };

    Object.keys(obj).map(key => {
      string = this.replaceAll(string, key, obj[key]);
      return null;
    });
    return string;
  };

  toArabicCharacter = string => {
    if (!string) return null;
    var obj = {
      ک: "ك",
      ی: "ي"
    };
    Object.keys(obj).map(key => {
      string = this.replaceAll(string, key, obj[key]);
      return null;
    });
    return string;
  };

  toIterable = items => {
    let iterables = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === "2") {
        iterables.push(items[i]);
      } else if (items[i].children) {
        let ret = this.toIterable(items[i].children);
        if (ret && ret.length) {
          iterables.push(...ret);
        }
      }
    }
    return iterables;
  };
  convertNames = items => {
    for (let i = 0; i < items.length; i++) {
      items[i].name = this.toPersianCharacter(items[i].name);
    }
    return items;
  };
  prepend = (value, array) => {
    let arr = array.slice();
    arr.unshift(value);
    return arr;
  };

  render() {
    let { items, iterables, filtered, search } = this.state;
    return (
      <React.Fragment>
        <nav className="col-md-3 col-lg-2 d-md-block sidebar">
          <div className="sidebar-content">
            {this.props.search && (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                    search = this.toArabicCharacter(e.target.value);
                    filtered = [];
                    if (search) {
                      filtered = iterables.filter(it => {
                        return it.name.includes(search);
                      });
                    }
                    this.setState({
                      search: e.target.value,
                      iterables: iterables,
                      filtered: filtered
                    });
                  }}
                  value={this.state.search}
                  placeholder="Search"
                  style={{ padding: "0 10px" }}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <span className="fa fa-search"></span>
                  </span>
                </div>
              </div>
            )}
            <div className="sidebar-sticky">
              <SidebarItem items={search ? filtered : items} depth={1} />
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default Sidebar;
