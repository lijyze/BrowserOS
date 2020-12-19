import {
  CHANGE_ACTIVE_APP,
  TOGGLE_MENU_BAR_ACTIVE
} from './actionTypes'

export const changeActiveApp = (appId: number) => ({
  type: CHANGE_ACTIVE_APP,
  payload: appId,
})

export const toggleMenuBarActive = (appId: number) => ({
  type: TOGGLE_MENU_BAR_ACTIVE,
  payload: appId,
})