import { Menu } from "antd";
import { Component } from "react";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="problems">
          <a href="/problems">Problems</a>
        </Menu.Item>
        <Menu.Item key="questions">
          <a href="/questions">Questions</a>
        </Menu.Item>
        <Menu.Item key="assesments">
          <a href="/assesments">Assesments</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
