import {
  ADD_APP_TO_STORE,
  ADD_APP_TO_OS,
  AddAppAction,
  REMOVE_APP_FROM_OS,
  RemoveAppAction,
  ADD_PROCESSES,
  AddProcessAction,
  SHUTDOWN_PROCESSES,
  ShutdownProcessAction,
} from './types'

export const addAppToStore: (app: string) => AddAppAction = app => ({
  type: ADD_APP_TO_STORE,
  payload: app
})

export const addAppToOS: (app: string) => AddAppAction = app => ({
  type: ADD_APP_TO_OS,
  payload: app
})

export const removeAppFromOS: (app: string) => RemoveAppAction = app => ({
  type: REMOVE_APP_FROM_OS,
  payload: app
})

export const addProcess: (app: string) => AddProcessAction = app => ({
  type: ADD_PROCESSES,
  payload: app
})

export const shutDownProcess: (app: string) => ShutdownProcessAction = app => ({
  type: SHUTDOWN_PROCESSES,
  payload: app
})

