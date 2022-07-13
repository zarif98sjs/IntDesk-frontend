import { Menu } from "antd";
import { Component } from "react";
import { Link } from "react-router-dom"


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="problems">
          <Link to="/problems">Problems</Link>
        </Menu.Item>
        <Menu.Item key="questions">
          <Link to="/questions">Questions</Link>
        </Menu.Item>
        <Menu.Item key="assessments">
          <a href="/assessments">Assesments</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
