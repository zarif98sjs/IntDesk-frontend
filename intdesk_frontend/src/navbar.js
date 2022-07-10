import { Button, Drawer } from "antd";
import "antd/dist/antd.min.css";
import { Component } from "react";
import "./app.css";
import LeftMenu from "./left";
import RightMenu from "./right";

class Navbar extends Component {

  state = {
    current: "mail",
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  
  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <a href="www.marca.com">IntDesk</a>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default Navbar;
