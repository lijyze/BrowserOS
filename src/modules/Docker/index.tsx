import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {addAppToDocker} from './../../store/docker/actions';
import {addProcess} from './../../store/global/action'

import './style/index.less'
import iconTrash from './../../images/TrashIcon.png'

export interface DockerProperty {
  appMap: Map<string, {icon: string}>
}

const Docker: React.FC<DockerProperty> = (props) => {
  const apps: string[] = useSelector((store: any) => (store.docker.apps))
  const dispatch = useDispatch()

  useEffect(() => {
    // 默认扫雷加入docker app list
    dispatch(addAppToDocker('扫雷'))
  }, [])

  return (
    <div id='docker'>
      {apps.map((app, index) => (
        <img
          src={props.appMap.get(app)?.icon} 
          key={index} 
          className='docker-icon' 
          alt=""
          onClick={() => {dispatch(addProcess(app))}}
        />
      ))}
      <div className="docker-divider"></div>
      <img src={iconTrash} alt="" className={'docker-icon'}/>
    </div>
  )
}

export default Docker
