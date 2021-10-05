import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import Storage from "../storage";
import packageJson from "../../../package.json";
// import $ from "jquery";

const SidebarItem = ({ items, depth }) => {
  const active = [
    "/" + packageJson.homepage + "/",
    "/" + packageJson.homepage
  ].includes(window.location.pathname)
    ? "/" + packageJson.homepage + "/"
    : window.location.pathname.replace(/\/edit\/\d/g, "").replace(/\/add/g, "");

  const loadOpenItems = () => {
    let items = Storage.getItem("menu");
    return items === null ? [] : JSON.parse(items);
  };
  const saveOpenItems = items => {
    Storage.setItem("menu", JSON.stringify(items));
  };
  const [isOpen, setIsOpen] = useState(loadOpenItems());
  const toggle = id => {
    let newArr = loadOpenItems();
    if (newArr[id] !== undefined) {
      newArr[id] = !newArr[id];
    } else {
      newArr[id] = true;
    }
    setIsOpen(newArr);
    saveOpenItems(newArr);
  };

  const closeMenu = () => {
    // let open = $("body").hasClass("sidebar-open");
    let open = document
      .querySelector("body")
      .classList.contains("sidebar-open");
    if (open) {
      // $("body").removeClass("sidebar-open");
      document.querySelector("body").classList.remove("sidebar-open");
    }
  };

  return (
    <span>
      {items.map(item => (
        <ul key={item.id} className="nav flex-column">
          <li
            key={item.id}
            className="nav-link"
            style={{ paddingRight: depth * 15 }}
          >
            {item.type === "2" ? (
              <Link
                className={[
                  "nav-link",
                  active === "/" + packageJson.homepage + "/" + item.path
                    ? "active"
                    : null
                ].join(" ")}
                onClick={() => {
                  // document.title = item.path
                  //   ? "سامانه سوخت - " + item.name
                  //   : "سامانه سوخت";
                  closeMenu();
                }}
                to={item.path ? "/" + item.path : "/"}
              >
                <span className={item.icon} />
                <span className="m-2">{item.name}</span>
              </Link>
            ) : (
              <span
                className="nav-menu unselectable"
                unselectable="on"
                onClick={() => toggle(item.id)}
              >
                <span
                  className={[
                    "fa",
                    isOpen[item.id] ? "fa-angle-up" : "fa-angle-down"
                  ].join(" ")}
                />
                <span className="m-2">{item.name}</span>
              </span>
            )}
          </li>
          {item.children && item.children.length ? (
            <Collapse isOpen={isOpen[item.id]}>
              <SidebarItem items={item.children} depth={depth + 1} />
            </Collapse>
          ) : null}
        </ul>
      ))}
    </span>
  );
};

export default SidebarItem;
