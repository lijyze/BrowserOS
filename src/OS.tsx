import React, {Dispatch, useEffect} from 'react';
import {connect} from 'react-redux'

import Docker from './modules/Docker';
import MenuBar from './modules/MenuBar';
import Playground from './modules/Playground';

import {setMenubarActive} from './store/menubar/actions'

import './OS.less';
import backgroundImage from './images/BigSur.jpg';

interface OSProperty {
  onClick: any
}

interface WindowProperty {
  button?: {
    close?: boolean,
  }
}

const Window: React.FC<WindowProperty> = (props) => {
  return (
    <div className='window'>
      <div className='window-tool'>
        <button className='window-tool-close'></button>
      </div>
      {props.children}
    </div>
  )
}

class OS extends React.Component<OSProperty> {

  static Window = Window

  // 取消app的默认右键事件
  componentDidMount() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  render() {
    return (
      <div id="os" style={{
        backgroundImage: `url(${backgroundImage})`,
      }} onClick={(event) => {
        this.props.onClick()
      }}>
        <MenuBar />
        <Playground />
        <Docker />
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClick: () => {dispatch(setMenubarActive(false))}
  }
}



export default connect(null, mapDispatchToProps)(OS);

