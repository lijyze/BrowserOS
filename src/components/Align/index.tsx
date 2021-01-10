import React from 'react'
import './style/index.less'

// TODO: will be useful
export interface Point {
  x: number,
  y: number
}

export type Direction = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'

// TODO: will be useful
// interface PointOffset {
//   point: Point,
//   offset?: Point,
// }

interface ElementOffset {
  targetElement: HTMLElement,
  direction: Direction,
  offset?: Point,
}

// TODO: will be useful 
// export type AlignProps = PointOffset | ElementOffset;

class Align extends React.Component<ElementOffset> {

  render() {
    const {
      targetElement,
      direction,
    } = this.props

    let top, left

    if (direction === 'bl') {
      top = targetElement.offsetTop + targetElement.offsetHeight
      left = targetElement.offsetLeft
    }

    return (
      <div className='popup' style={{
        top: top + 'px',
        left: left + 'px',
      }}>
        {this.props.children}
      </div>
    )
  }

}

export default Align
