import {
  ADD_APP_TO_DOCKER,
  AddAppAction,
  REMOVE_APP_FROM_DOCKER,
  RemoveAppAction
} from './types'

export const addAppToDocker: (app: string) => AddAppAction = app => ({
  type: ADD_APP_TO_DOCKER,
  payload: app
})

export const removeAppToDocker: (app: string) => RemoveAppAction = app => ({
  type: REMOVE_APP_FROM_DOCKER,
  payload: app
})