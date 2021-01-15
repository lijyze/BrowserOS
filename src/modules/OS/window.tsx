import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { shutDownProcess } from '../../store/global/action'

interface WindowProperty {
  button?: {
    close?: boolean,
  },
  processId?: string,
  rememberPosition?: boolean,
  name?: string,
  style?: {},
  customCloseHandler?: () => void
}

const positionMap = new Map<string, {left: any, top: any}>()


const Window: React.FC<WindowProperty> = (props) => {

  const {
    processId,
    name,
    rememberPosition,
    customCloseHandler,
    style
  } = props

  const dispatch = useDispatch()

  const windowRef = useRef<any>(null)
  const windowToolRef = useRef<any>(null)

  let cachePosition
  if (name) cachePosition = positionMap.get(name)

  const [left, setLeft] = useState<number | string>(cachePosition?.left || 0)
  const [top, setTop] = useState<number | string>(cachePosition?.top || 0)

  let coord: {
    startX: number,
    startY: number,
    targetX: number,
    targetY: number
  }

  const mouseDownHandler = (event: MouseEvent) => {
    coord = {
      startX: event.clientX,
      startY: event.clientY,
      targetX: windowRef.current.offsetLeft,
      targetY: windowRef.current.offsetTop,
    }
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = (event: MouseEvent) => {
    const left = coord.targetX + event.clientX - coord.startX
    let top = coord.targetY + event.clientY - coord.startY
    top = top <= 0? 0: top;
    
    setLeft(left + 'px')
    setTop(top + 'px')
  }

  const mouseUpHandler = (event: MouseEvent) => {
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  const closeClickHandler = (event: any) => {
    if (rememberPosition && name) {
      positionMap.set(name, {
        left,
        top
      })
    }

    if (processId) {
      dispatch(shutDownProcess(processId))
    } else {
      customCloseHandler?.()
    }
  }

  useEffect(() => {
    // 如果是app则可以拖拽
    if (processId) windowToolRef.current.addEventListener('mousedown', mouseDownHandler)
  }, [])

  return (
    <div 
      className='window' 
      style={{
        backgroundColor: 'white',
        left,
        top,
        ...style
      }}
      ref={windowRef}
    >
      <div className='window-tool' ref={windowToolRef}>
        <button 
          className='window-tool-close'
          onClick={closeClickHandler}
        ></button>
      </div>
      <div className='window-content'>
        {props.children}
      </div>
    </div>
  )
}

export default Window
