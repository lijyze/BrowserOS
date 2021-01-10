import {
  SET_MENUBAR_ACTIVE,
  SET_MENU_ITEM_ACTIVE,
  MenubarAction,
  MenubarState,
} from './types'

const initialState: MenubarState = {
  isMenubarActive: false,
  activeItem: []
}

const menubar = (state: MenubarState = initialState, action: MenubarAction) => {
  switch (action.type) {

    case SET_MENUBAR_ACTIVE: {
      return {
        ...state, 
        isMenubarActive: action.payload
      }
    }

    case SET_MENU_ITEM_ACTIVE: {
      if (action.payload.parentId) {
        const activeItem = state.activeItem
        const newActiveItem = activeItem.slice(0, activeItem.indexOf(action.payload.parentId) + 1);
        newActiveItem.push(action.payload.id);

        return {
          ...state,
          activeItem: newActiveItem
        }
      } else {
        return {
          ...state,
          activeItem: [action.payload.id]
        }
      }
    }

    default: {
      return state
    }

  }
}

export default menubar;