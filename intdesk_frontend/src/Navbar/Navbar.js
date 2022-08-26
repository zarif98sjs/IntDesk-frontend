import { Button, Drawer } from "antd";
import "antd/dist/antd.min.css";
import { useEffect, useState } from "react";
import logo from "../images/logoOnly.png";
import LeftMenu from "./LeftMenu";
import "./logo.css";
import "./navbar.css";
import RightMenu from "./RightMenu";
import RightUser from "./RightUserMenu";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  useEffect(() => {
    console.log("inside use effect : ");
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="Navbar">
      <nav className="menuBar">
        <div className="logo">
          <a href="/">
            <img src={logo} id="logoOnly" alt="IntDesk" />
          </a>
        </div>

        {/* <div className="logo">
            <a href="/">IntDesk</a>
            </div>
             */}
        <div className="menuCon">
          <div className="leftMenu" style={{ padding: "0.4%" }}>
            <LeftMenu />
          </div>
          {/* check if logged in is true */}
          {isLoggedIn ? (
            <div className="rightMenu" style={{ padding: "0.4%" }}>
              <RightUser />
            </div>
          ) : (
            <div className="rightMenu" style={{ padding: "0.4%" }}>
              <RightMenu />
            </div>
          )}

          <Button className="barsMenu" type="primary" onClick={showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
      {/* <br /> */}
    </div>
  );
}

export default Navbar;
