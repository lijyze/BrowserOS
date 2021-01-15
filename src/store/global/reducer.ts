import {
  ADD_APP_TO_STORE,
  ADD_APP_TO_OS,
  REMOVE_APP_FROM_OS,
  GlobalAction,
  GlobalState,
  ADD_PROCESSES,
  SHUTDOWN_PROCESSES
} from './types'

const initialState = {
  appStore: [],
  appLocal: [],
  processes: [],
}

const global = (state: GlobalState = initialState, action: GlobalAction) => {
  switch (action.type) {

    case ADD_APP_TO_STORE: {
      return {
        ...state,
        appStore: [...state.appStore, action.payload],
      }
    }

    case ADD_APP_TO_OS: {
      return  {
        ...state,
        appLocal: [...state.appLocal, action.payload],
      }
    }

    case REMOVE_APP_FROM_OS: {
      return {
        ...state,
        appLocal: state.appLocal.filter(app => app !== action.payload)
      }
    }

    case ADD_PROCESSES: {
      // 进程已经开启
      if (state.processes.includes(action.payload)) {
        return {
          ...state,
        }
      } else {
        return {
          ...state,
          processes: [...state.processes, action.payload]
        }
      }
    }

    case SHUTDOWN_PROCESSES: {
      return {
        ...state,
        processes: state.processes.filter(value => value !== action.payload)
      }
    }
    
    default: {
      return state
    }

  }
}

export default global