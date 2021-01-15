// 库
import React from 'react';
import {connect} from 'react-redux'

// actions
import {setMenubarActive} from '../../store/menubar/actions'
import {addAppToOS, addAppToStore} from '../../store/global/action'

// UI component
import Docker from '../Docker';
import MenuBar from '../MenuBar';
import Playground from '../Playground';

// style
import './style/index.less';
import backgroundImage from './../../images/BigSur.jpg';

// local variate
import * as apps from '../../apps'

interface OSProperty {
  onClick: any
  addAppToStore: any
  addAppToOS: any
}



class OS extends React.Component<OSProperty> {

  private appMap = new Map();

  constructor(props: any) {
    super(props)

    Object.values(apps).forEach((value) => {
      const {name, symbol, icon, component, menu} = value

      this.appMap.set(name, {name, symbol, component, icon, menu})

      this.props.addAppToStore(name);
      this.props.addAppToOS(name)
    })
  }

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
        <MenuBar appMap={this.appMap}/>
        <Playground appMap={this.appMap} />
        <Docker appMap={this.appMap}/>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClick: () => {dispatch(setMenubarActive(false))},
    addAppToStore: (app: string) => {dispatch(addAppToStore(app))},
    addAppToOS: (app: string) => {dispatch(addAppToOS(app))},
  }
}

export default connect(null, mapDispatchToProps)(OS);
