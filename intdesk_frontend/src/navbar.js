import { Button, Drawer } from "antd";
import "antd/dist/antd.min.css";
import { Component } from "react";
import LeftMenu from "./left";
import "./navbar.css";
import RightMenu from "./right";
import RightUser from "./rightUser";

class Navbar extends Component {

  state = {
    current: "mail",
    visible: false,
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
  };

  componentDidMount() {
    console.log("Navbar componentDidMount");
  }


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

  
  // get value from local storage
  // const authToken = JSON.parse(localStorage.getItem("authToken"));
  render() {
    return (
        <div className="Navbar">
            <nav className="menuBar">
                <div className="logo">
                <a href="/">IntDesk</a>
                </div>
                <div className="menuCon">
                <div className="leftMenu">
                    <LeftMenu />
                </div>
                {/* check if logged in is true */}
                {this.state.isLoggedIn ? ( 
                    <div className="rightMenu">
                    <RightUser />
                    </div>
                ) : (
                    <div className="rightMenu">
                    <RightMenu />
                    </div>
                )}
                
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
            <br />
        </div>
    );
  }
}
export default Navbar;
