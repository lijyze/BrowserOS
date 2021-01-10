import React, { MouseEventHandler } from 'react'
import MenuItem from './MenuItem'
import ItemGroup from './ItemGroup'
import SubMenu from './SubMenu'
import Divider from './Divider'

import './style/index.less'

interface MenuProps {
  id?: string,
  className?: string,
  mode? : string,
  style? : React.CSSProperties,
  onClick?: MouseEventHandler,
  onItemClick?: MouseEventHandler,
}


class Menu extends React.Component<MenuProps> {

  static Item = MenuItem;

  static ItemGroup = ItemGroup;

  static SubMenu = SubMenu;

  static Divider = Divider;

  render() {
    const {onItemClick} = this.props

    const children = React.Children.map(this.props.children, (child) => (
      React.cloneElement(child as React.ReactElement, {
        onClick: onItemClick
      })
    ))

    return (
      <ul id={this.props.id} className={this.props.className} onClick={this.props.onClick}>
        {children}
      </ul>
    )
  }

}


export default Menu
