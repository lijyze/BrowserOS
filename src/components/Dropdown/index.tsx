import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import Align, {Direction} from './../Align'

interface DropdownProperty {
  overlay: ReactElement,
  trigger?: 'click' | 'hover' | 'contextMenu',
  direction?: Direction, 
  visible: boolean,
  targetElement?: HTMLElement,
}

class Dropdown extends React.Component<DropdownProperty> {
  private childRef = React.createRef<HTMLElement>()

  render() {
    const {
      direction = 'bl',
      targetElement = this.childRef.current as HTMLElement,
    } = this.props

    const child = React.cloneElement(this.props.children as ReactElement, {
      ref: this.childRef
    });

    const overlay = ReactDOM.createPortal(
      <Align {...{direction, targetElement}}>{this.props.overlay}</Align>,
      document.body
    )

    return (
      <>
        {child}
        {this.props.visible && overlay}
      </>
    )
  }

}

export default Dropdown
