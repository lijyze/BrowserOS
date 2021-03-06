import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Menu from '../../components/Menu'
import Time from './time'

import {MenubarState} from './../../store/menubar/types'
import {setMenubarActive, setMenuItemActive} from './../../store/menubar/actions'
import {systemIconData, defaultMenuData, MenuData, Divider} from './system'

import './style/index.less'

interface MenubarProperty {
  appMap: Map<string, {menu: any}>
}

interface rawState {
  menubar: MenubarState
}

const MenuBar: React.FC<MenubarProperty> = (props) => {
  const isMenuBarActive = useSelector((store:rawState) => (store.menubar.isMenubarActive))
  const activeItem = useSelector((store: rawState) => (store.menubar.activeItem))
  const activeApp = useSelector((state: any) => (state.global.processes[0]))
  const dispatch = useDispatch();

  // 点击菜单栏将菜单栏设置活跃状态
  const menuClickHandler = (event: React.MouseEvent) => {
    dispatch(setMenubarActive(true))
    event.stopPropagation()
  }

  const menuItemMouseOverHandler = (id: number, parentId: number | undefined) => {
    dispatch(setMenuItemActive({id, parentId}))
  }

  // 数据转化为jsx
  const convertDataToLayout = (data: (MenuData | Divider)[]) => (
    data.map((value, index) => {
      // 分割线
      if ('divider' in value) {
        return <Menu.Divider key={index} />
      }

      // 有子项
      if (value.children) {
        return (
          <Menu.SubMenu key={index} title={value.fieldName}>
            {convertDataToLayout(value.children)}
          </Menu.SubMenu>
        )
      }

      // 无子项
      return  (
        <Menu.Item 
          key={index}
          onMouseOver={() => {menuItemMouseOverHandler((value as MenuData).fieldId, (value as MenuData).parentId)}}
          active={activeItem.includes(value.fieldId)}
          onClick={(event) => {
            (value as MenuData).event?.()

            // 关闭菜单
            dispatch(setMenubarActive(false))
            event.stopPropagation()
          }}
        >
          {value.fieldName}
        </Menu.Item>
      )
    })
  )

  const systemIcon = (
    <Menu.SubMenu 
      title={<div className='field-name-container'></div>}
      key={1000}
      active={isMenuBarActive && activeItem.includes(systemIconData.fieldId)}
      className={'menu-item'}
      onMouseOver={() => {menuItemMouseOverHandler(systemIconData.fieldId, undefined)}}
    >
      {convertDataToLayout(systemIconData.children)}
    </Menu.SubMenu>
  )

  const menuData: MenuData[] = activeApp? props.appMap.get(activeApp)!.menu: defaultMenuData

  return (
    <div id='menu-bar'>
      <Menu id='menu-bar-menu' mode='horizontal' onClick={menuClickHandler}>
        {systemIcon}
        {menuData.map((value, index) => {
          // 有子项
          if ((value as MenuData).children) {
            return (
              <Menu.SubMenu 
                key={index} 
                title={<div className={'field-name-container'}>{(value as MenuData).fieldName}</div>} 
                active={isMenuBarActive && activeItem.includes((value as MenuData).fieldId)}
                className={'menu-item'}
                onMouseOver={() => {menuItemMouseOverHandler((value as MenuData).fieldId, (value as MenuData).parentId)}}
              >
                {convertDataToLayout((value as MenuData).children as MenuData[])}
              </Menu.SubMenu>
            )
          }

          return null

          // 无子项
          // return  (
          //   <Menu.Item 
          //     key={index} 
          //     className={'menu-item'}
          //   >
          //     {<div className={'field-name-container'}>(value as MenuData).fieldName</div>}
          //   </Menu.Item>
          // )
        })}
      </Menu>

      <Menu id='menu-bar-tools' mode='horizontal'>

        <Menu.Item key={'time'} active={false}>
          <div className='field-name-container' style={{whiteSpace: 'pre'}}>
            <Time />
          </div>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default MenuBar



