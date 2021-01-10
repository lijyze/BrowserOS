import React, {ReactElement, ReactNode} from 'react'
import ReactDOM from 'react-dom'
import Popup from './Popup'

export interface TriggerProperty {
  popup: ReactNode,
  action: 'hover' | 'click' | 'contextMenu',
  forceRender?: boolean,
  alignTarget: {current: HTMLElement}
}

export interface TriggerState {
  popupVisible: boolean
}

class Trigger extends React.Component<TriggerProperty, TriggerState> {

  removeClicklickOutSideHandler: (() => void) | null

  constructor(props: TriggerProperty) {
    super(props)
    this.state = {
      popupVisible: false
    }
    this.removeClicklickOutSideHandler = null
  }

  static triggerMap = new Map<string, string>([
    ['hover', 'onMouseOver'],
    ['click', 'onClick'],
    ['contextMenu', 'onContextMenu']
  ])

  close = () => {
    this.setState({popupVisible: false})
  }

  componentDidUpdate() {
    if (!this.removeClicklickOutSideHandler) {
      document.addEventListener('mousedown', this.close)

      this.removeClicklickOutSideHandler = () => {
        document.removeEventListener('mousedown', this.close)
      }

      return 
    }

    this.removeClicklickOutSideHandler!();
    this.removeClicklickOutSideHandler = null;
  }

  render() {
    const {popupVisible} = this.state;
    const {forceRender} = this.props;
    
    let shouleRender: boolean

    if (forceRender === true || forceRender === false) {
      shouleRender = forceRender;
    } else {
      shouleRender = popupVisible
    }

    // build children
    const childrenProps: any = {}
    // childrenProps.onClick = (e: React.MouseEvent) => {
    //   this.setState({popupVisible: true})
    // }
    const children = React.cloneElement(this.props.children as ReactElement, childrenProps)

    // build popup
    let popup = <Popup alignTarget={this.props.alignTarget.current}>{this.props.popup}</Popup>;

    return (
      <>
        {children}
        {shouleRender && popup}
      </>
    )
  }

}

export default Trigger
