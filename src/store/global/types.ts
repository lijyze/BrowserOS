// add app to store or os
export const ADD_APP_TO_STORE = 'ADD_APP_TO_STORE'
export const ADD_APP_TO_OS = 'ADD_APP_TO_OS'

export interface AddAppAction {
  type: typeof ADD_APP_TO_STORE | typeof ADD_APP_TO_OS,
  payload: string
}

// remove app from os
export const REMOVE_APP_FROM_OS = 'REMOVE_APP_FROM_OS'
export interface RemoveAppAction {
  type: typeof REMOVE_APP_FROM_OS,
  payload: string
}

// addProcess
export const ADD_PROCESSES = 'ADD_PROCESSES'
export interface AddProcessAction {
  type: typeof ADD_PROCESSES,
  payload: string
}

// removeProcess
export const SHUTDOWN_PROCESSES = 'SHUTDOWN_PROCESSES'
export interface ShutdownProcessAction {
  type: typeof SHUTDOWN_PROCESSES,
  payload: string
}


export interface GlobalState {
  appStore: string[]
  appLocal: string[]
  processes: string[]
}

export type GlobalAction = 
  AddAppAction | 
  RemoveAppAction |
  AddProcessAction |
  ShutdownProcessAction
