import React, { MouseEventHandler, ReactElement } from 'react'
import Trigger from '../Trigger'
import Menu from './index'

interface SubMenuProperty {
  title: string | ReactElement,
  className?: string,
  active?: boolean,
  trigger?: 'hover' | 'click' | 'contextMenu',
  onClick?: MouseEventHandler,
  onMouseOver?:MouseEventHandler
}


class SubMenu extends React.Component<SubMenuProperty> {
  alignTargetRef: React.RefObject<HTMLElement>

  constructor(props: SubMenuProperty) {
    super(props)
    this.alignTargetRef = React.createRef();
  }

  render() {
    const {
      children: popup,
      className,
      trigger = 'hover',
      active,
      onClick,
      onMouseOver,
    } = this.props

    const menuItem = (
      <Menu.Item 
        className={className}
        elementRef={this.alignTargetRef}
        active={active}
        onMouseOver={onMouseOver}
      >
        {this.props.title}
      </Menu.Item>
    )

    return (
      <Trigger
        popup={<Menu onItemClick={onClick}>{popup}</Menu>}
        action={trigger}
        forceRender={active}
        alignTarget={this.alignTargetRef as any}
      >
        {menuItem}
      </Trigger>
    )
  }

}

export default SubMenu
