import React, { RefObject } from 'react'

interface MenuItemProperty {
  className?: string,
  active?: boolean,
  elementRef?: RefObject<HTMLElement>,
  onMouseOver?: React.MouseEventHandler,
  onClick?: React.MouseEventHandler,
  onItemClick?: React.MouseEventHandler,
}

class MenuItem extends React.Component<MenuItemProperty> {

  render() {
    const {
      className,
      elementRef,
      onMouseOver,
      children,
      onClick,
      onItemClick,
      active
    } = this.props;

    let finalClass = className? className + ' menu-item': 'menu-item'
    finalClass += active? ' active': '';

    return (
      <li 
        className={finalClass}
        ref={elementRef as RefObject<HTMLLIElement>}
        onMouseOver={onMouseOver}
        onClick={(event) => {
          onClick?.(event)
          onItemClick?.(event)
        }}
      >
        {children}
      </li>
    )
  }

}

export default MenuItem
