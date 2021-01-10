import React, { RefObject } from 'react'

interface MenuItemProperty {
  className?: string,
  active?: boolean,
  elementRef?: RefObject<HTMLElement>,
  onMouseOver?: React.MouseEventHandler,
  onClick?: React.MouseEventHandler,
}

class MenuItem extends React.Component<MenuItemProperty> {

  render() {
    const {
      className,
      elementRef,
      onMouseOver,
      children,
      onClick,
      active
    } = this.props;

    let finalClass = className? className + ' menu-item': 'menu-item'
    finalClass += active? ' active': '';

    return (
      <li 
        className={finalClass}
        ref={elementRef as RefObject<HTMLLIElement>}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        {children}
      </li>
    )
  }

}

export default MenuItem
