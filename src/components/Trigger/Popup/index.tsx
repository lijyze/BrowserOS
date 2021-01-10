import React from 'react'
import Align from '../../Align'
import Portal from '../../Portal'

import './style/index.less'

export interface PopupProperty {
  alignTarget: HTMLElement,
  direction?: string
}

class Popup extends React.Component<PopupProperty> {
  render() {
    const portal = (
      <Portal>
        {<Align
          targetElement={this.props.alignTarget}
          direction='bl'
        >
          {this.props.children}
        </Align>}
      </Portal>
    )

    return (
      portal
    )
  }
}

export default Popup
