// 设置菜单栏活跃状态
export const SET_MENUBAR_ACTIVE = 'SET_MENUBAR_ACTIVE'
export interface SetMenubarActiveAction {
  type: typeof SET_MENUBAR_ACTIVE,
  payload: boolean,
}

// 设置菜单项活跃状态
export const SET_MENU_ITEM_ACTIVE = 'SET_MENU_ITEM_ACTIVE'
export interface ItemLocation {
  id: number,
  parentId?: number,
}
export interface SetMenuItemActiveAction {
  type: typeof SET_MENU_ITEM_ACTIVE,
  payload: ItemLocation,
}

export type MenubarAction = SetMenubarActiveAction | SetMenuItemActiveAction

// 菜单栏state形状
export interface MenubarState {
  isMenubarActive: boolean,
  activeItem: number[],
}