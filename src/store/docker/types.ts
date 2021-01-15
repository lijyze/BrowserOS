// add app to docker
export const ADD_APP_TO_DOCKER = 'ADD_APP_TO_DOCKER'
export interface AddAppAction {
  type: typeof ADD_APP_TO_DOCKER
  payload: string
}

// remove app from docker
export const REMOVE_APP_FROM_DOCKER = 'REMOVE_APP_FROM_DOCKER'
export interface RemoveAppAction {
  type: typeof REMOVE_APP_FROM_DOCKER
  payload: string
}

export type DockerAction = AddAppAction | RemoveAppAction

// state
export interface DockerState {
  apps: string[]
}