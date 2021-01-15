import {
  ADD_APP_TO_DOCKER,
  REMOVE_APP_FROM_DOCKER,
  DockerAction,
  DockerState,
} from './types'

const initialState = {
  apps: []
}

const docker = (state: DockerState = initialState, action: DockerAction) => {
  switch (action.type) {

    case ADD_APP_TO_DOCKER: {
      return {
        ...state,
        apps: [...state.apps, action.payload]
      }
    }

    case REMOVE_APP_FROM_DOCKER: {
      return {
        ...state,
        apps: state.apps.filter(app => app !== action.payload)
      }
    }

    default: {
      return state
    }

  }
}

export default docker