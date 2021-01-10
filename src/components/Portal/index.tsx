import React from 'react'
import ReactDOM from 'react-dom'

export interface PortalProperty {
  target?: Element
}

class Portal extends React.Component<PortalProperty> {
  render() {
    const target = this.props.target || document.body

    return (
      ReactDOM.createPortal(this.props.children, target)
    )
  }
}

export default Portal
