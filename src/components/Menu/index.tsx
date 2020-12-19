import React from 'react'
import MenuItem from './MenuItem'
import ItemGroup from './ItemGroup'
import SubMenu from './SubMenu'

interface MenuProps {
  id: string,
  direction? : string,
}


class Menu extends React.Component<MenuProps> {

  static Item = MenuItem;

  static ItemGroup = ItemGroup;

  static SubMenu = SubMenu;

  render() {
    return (
      <ul id={this.props.id} className={`menu-${this.props.direction || 'vertical'}`}>
        {this.props.children}
      </ul>
    )
  }

}


export default Menu
