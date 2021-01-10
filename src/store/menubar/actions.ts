import {
  SET_MENUBAR_ACTIVE,
  SetMenubarActiveAction,
  SET_MENU_ITEM_ACTIVE,
  ItemLocation,
  SetMenuItemActiveAction
} from './types'


// 设置菜单栏活跃状态
export const setMenubarActive: (isActive: boolean) => SetMenubarActiveAction = (isActive) => ({
  type: SET_MENUBAR_ACTIVE,
  payload: isActive,
})

// 设置菜单项活跃状态
export const setMenuItemActive: (activeItem: ItemLocation) => SetMenuItemActiveAction = (activeItem) => ({
  type: SET_MENU_ITEM_ACTIVE,
  payload: activeItem,
})