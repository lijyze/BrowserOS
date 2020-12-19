import React from 'react'
import Menu from '../../components/Menu'
import {menuData} from '../../OSconfig'
import './MenuBar.css'

const MenuBar: React.FC = (options) => {
  return (
    <div id='menu-bar'>
      <Menu id='menu-bar-menu'>
        {menuData.map((value) => (
          <Menu.Item>
            <div className='field-name-container'>
              {value.fieldName}
            </div>
          </Menu.Item>
        ))}
      </Menu>
      {/* <Tools id='tools' data={{}}/> */}
    </div>
  )
}

export default MenuBar
