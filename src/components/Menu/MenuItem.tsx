import React from 'react'

class MenuItem extends React.Component {
  render() {
    return (
      <li className='menu-item'>
        {this.props.children}
      </li>
    )
  }
}

export default MenuItem
