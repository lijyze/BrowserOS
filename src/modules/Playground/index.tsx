import React, { ReactElement, ReactNode } from 'react'
import {useSelector} from 'react-redux'

import './style/index.less'

interface PlaygroundProperty {
  appMap: Map<string, {component: ReactNode}>
}

const Playground: React.FC<PlaygroundProperty> = (props) => {
  const processes: string[] = useSelector((state: any) => (state.global.processes))

  return (
    <div id='playground'>
      {processes.map((app, index) => (
        React.cloneElement(props.appMap.get(app)!.component as ReactElement, {
          key: index,
          processId: app
        })
      ))}
    </div>
  )
}

export default Playground
