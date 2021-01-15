import React, {useState, useEffect, useRef} from 'react'

import Window from '../../modules/OS/window';

import './style/index.less'
import icon from './images/icon-sweeper.png'

class SweeperGame {
  [x: string]: any;
  constructor() {
    this.cubeWidth = 23
    this.gap = 2
    this.gameData = []
    this.colorSet = [undefined, "#00f", "#008000", "#f00", "#000080", "#800000", "#008080", "#000", "#808080"];
  }

  resize() {
    this.width = (this.cubeWidth + 3 * this.gap) * this.x
    this.height = (this.cubeWidth + 3 * this.gap) * this.y
    this.setWidth?.(this.width)
    this.setHeight?.(this.height)
  }

  draw() {
    const base = this.cubeWidth + 3 * this.gap

    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.beginPath();
    this.ctx.fillStyle = '#888'
    this.ctx.rect(0, 0, this.width, this.height)
    this.ctx.fill()

    for (var i = 0; i < this.x; i++) {
      for (var j = 0; j < this.y; j++) {

        this.ctx.beginPath();
        this.ctx.fillStyle = "#ccc";
        this.ctx.rect(i * base + this.gap / 2, j * base + this.gap / 2, (this.cubeWidth + 2 * this.gap), (this.cubeWidth + 2 * this.gap));
        this.ctx.fill();

        if (this.gameData[i][j].label === 'close' || this.gameData[i][j].label === 'flag') {

          // 跳过当前的左键点选
          if (this.clickNow?.button === 0 && this.clickNow?.coord[0] === i && this.clickNow?.coord[1] === j) {
            if (this.gameData[i][j].label !== 'flag') continue;
          }
          this.ctx.beginPath();
          this.ctx.fillStyle = "#888";
          this.ctx.rect(i * base + this.gap / 2 * 3, j * base + this.gap / 2 * 3, this.cubeWidth, this.cubeWidth);
          this.ctx.fill();
        }

        if (this.gameData[i][j].label === 'flag') {
          this.ctx.beginPath();
          this.ctx.fillStyle = "red";
          this.ctx.moveTo(i * base + base / 3, j * base + base / 4);
          this.ctx.lineTo(i * base + base / 3, j * base + base / 2);
          this.ctx.lineTo(i * base + base / 3 * 2, j * base + base / 2);
          this.ctx.lineTo(i * base + base / 3, j * base + base / 4);
          this.ctx.fill();
          this.ctx.beginPath();
          this.ctx.fillStyle = "black";
          this.ctx.rect(i * base + base / 3, j * base + base / 2, 2, 8);
          this.ctx.fill();
        }

        if (this.gameData[i][j].label === 'open') {
          const num = this.gameData[i][j].data === 'boom'? '☀': this.gameData[i][j].data

          this.ctx.font = "700 20px Arial";
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";
          this.ctx.fillStyle = typeof num === 'number'? this.colorSet[num]: 'black'
          this.ctx.fillText(num, i * base + base / 2, j * base + base / 2)
        }

        if (this.gameData[i][j].label === 'wrong') {
          this.ctx.font = "700 20px Arial";
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";
          this.ctx.fillStyle = 'black'
          this.ctx.fillText('×', i * base + base / 2, j * base + base / 2)
        }
      }
    }

    if (this.wrongClick) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "red";
      this.ctx.rect(this.wrongClick[0] * base + this.gap / 2, this.wrongClick[1] * base + this.gap / 2, (this.cubeWidth + 2 * this.gap), (this.cubeWidth + 2 * this.gap));
      this.ctx.fill();

      this.ctx.font = "700 20px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = 'black'
      this.ctx.fillText('☀', this.wrongClick[0] * base + base / 2, this.wrongClick[1] * base + base / 2)
    }
  }

  init() {
    this.setEasy()
    this.resize()
  }

  getBoomList() {
    const queue = []
    const booms = []
    const boomList = []

    for (let i = 0; i < this.x * this.y; i++) {
      queue.push(i);
    }

    for (let i = 0; i < this.bCount; i++) {
      booms.push(queue.splice(Math.floor(Math.random() * queue.length), 1)[0])
    }

    for (let i = 0; i < this.x; i++) {
      boomList.push(new Array(this.y))
    }

    for (let i = 0; i < booms.length; i++) {
      boomList[Math.floor(booms[i] / this.y)][booms[i] % this.y] = 'boom'
    }

    return boomList
  }

  getAround(x: number, y: number) {
    const around = [];
    const l = [x - 1, y],
        lt = [x - 1, y - 1],
        t = [x, y - 1],
        tr = [x + 1, y - 1],
        r = [x + 1, y],
        rb = [x + 1, y + 1],
        b = [x, y + 1],
        bl = [x - 1, y + 1];
    if (x === 0 && y === 0) {
        around.push(r, rb, b);
    } else if (x === 0 && y === this.y - 1) {
        around.push(t, tr, r);
    } else if (x === this.x - 1 && y === 0) {
        around.push(b, bl, l);
    } else if (x === this.x - 1 && y === this.y - 1) {
        around.push(l, lt, t);
    } else if (x === 0) {
        around.push(t, tr, r, rb, b);
    } else if (y === 0) {
        around.push(r, rb, b, bl, l);
    } else if (x === this.x - 1) {
        around.push(b, bl, l, lt, t);
    } else if (y === this.y - 1) {
        around.push(l, lt, t, tr, r);
    } else {
        around.push(l, lt, t, tr, r, rb, b, bl);
    }
    return around;
  }

  getAroundBooms(boomList: any, x: number, y: number) {
    var around = this.getAround(x, y);
    var aroundBooms = [];
    for (var i = 0; i < around.length; i++) {
        if (boomList[around[i][0]][around[i][1]] === "boom") {
            aroundBooms.push(around[i]);
        }
    }
    return aroundBooms;
  };

  getGameData(boomList: any) {
    for (var i = 0; i < this.x; i++) {
        for (var j = 0; j < this.y; j++) {
            if (boomList[i][j] === undefined) {
                boomList[i][j] = this.getAroundBooms(boomList, i, j).length
            }
        }
    }

    this.convertData(boomList)

    return boomList
  }

  convertData(boomList: any) {
    for (var i = 0; i < this.x; i++) {
      for (var j = 0; j < this.y; j++) {
          boomList[i][j] = {
            data: boomList[i][j],
            label: 'close'
          }
      }
  }
  }

  reset() {
    this.wrongClick = null;
    this.playable = true;
    const boomList = this.getBoomList()

    this.gameData = this.getGameData(boomList)
  }

  mouseDown(button: number, x: number, y: number) {
    if (!this.playable) return;

    const coord = [
      Math.floor(x / (this.cubeWidth + 3 * this.gap)), 
      Math.floor(y / (this.cubeWidth + 3 * this.gap))
    ]

    this.clickNow = {
      button,
      coord
    }

    this.draw()
  }

  mouseUp(button: number, x: number, y: number) {
    if (!this.playable) return;

    const coord = [
      Math.floor(x / (this.cubeWidth + 3 * this.gap)), 
      Math.floor(y / (this.cubeWidth + 3 * this.gap))
    ]

    if (!this.clickNow) return;
    // 已经打开的不做处理
    if (this.gameData[coord[0]][coord[1]].label === 'open') return;

    const {
      button: downButton,
      coord: downCoord
    } = this.clickNow

    // 左键
    if (button === 0 && this.isSameButton(button, downButton) && this.isSameCube(coord, downCoord)) {
      if (this.gameData[coord[0]][coord[1]].label !== 'flag') {
        this.open(coord)
      }
    }

    // 右键
    if (button === 2 && this.isSameButton(button, downButton) && this.isSameCube(coord, downCoord)) {
      this.flag(coord);
    }


    this.clickNow = null
    this.draw()
  }

  open(coord: any) {
    const target = this.gameData[coord[0]][coord[1]]
    // 空白区
    if (target.data === 0) {
      target.label = 'open'
      const handleDatas = [coord]
      for (let i = 0; i < handleDatas.length; i++) {
        const around = this.getAround(handleDatas[i][0], handleDatas[i][1])

        for (let i = 0; i < around.length; i++) {
          const item = this.gameData[around[i][0]][around[i][1]]
          if (item.data === 0 && item.label === 'close') {
            item.label = 'open'
            handleDatas.push(around[i])
          }
        }
      }

      for (let i = 0; i < handleDatas.length; i++) {
        const around = this.getAround(handleDatas[i][0], handleDatas[i][1])

        for (let i = 0; i < around.length; i++) {
          const item = this.gameData[around[i][0]][around[i][1]]
          if (typeof item.data === 'number' && item.label === 'close') {
            item.label = 'open'
          }
        }
      }

      return
    }

    // 数字区
    if (typeof target.data === 'number') {
      target.label = 'open'

      return
    }

    // 雷区
    if (target.data === 'boom') {
      for (let i = 0; i < this.x; i++) {
        for (let j = 0;  j < this.y; j++) {
          const item = this.gameData[i][j]
          
          if (item.data === 'boom' && item.label !== 'flag') {
            item.label = 'open'
          }

          if (item.data !== 'boom' && item.label === 'flag') {
            item.label = 'wrong'
          }
        }
      }
      this.wrongClick = coord;
      this.playable = false;
    }
  }

  flag(coord: any) {
    this.gameData[coord[0]][coord[1]].label = this.gameData[coord[0]][coord[1]].label === 'close'? 'flag': 'close'
  }

  isSameCube(coord1: number[], coord2: number[]) {
    return coord1[0] === coord2[0] && coord1[2] === coord2[2]
  }

  isSameButton(button1: number, button2: number) {
    return button1 === button2
  }

  setEasy() {
    this.x = 9
    this.y = 9
    this.bCount = 10
    this.resize()
    this.reset()
  }

  setMedium() {
    this.x = 16
    this.y = 16
    this.bCount = 40
    this.resize()
    this.reset()
  }

  setHard() {
    this.x = 30
    this.y = 16
    this.bCount = 99
    this.resize()
    this.reset()
  }

  setCustom(x: number, y: number, count: number) {
    this.x = x;
    this.y = y;
    this.bCount = count;
    this.resize()
    this.reset()
  }
}

let sweeper = new SweeperGame()
sweeper.init()

const Sweeper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const[width, setWidth] = useState(sweeper.width)
  const[height, setHeight] = useState(sweeper.height)
  const [shouldCustomDialogShow, setShouldCustomDialogShow] = useState(false)

  sweeper.setWidth = setWidth
  sweeper.setHeight = setHeight
  sweeper.setShouldCustomDialogShow = setShouldCustomDialogShow

  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [customCount, setCustomCount] = useState('');

  const customConfirmHandler = (event: any) => {
    if (+customWidth && +customHeight && +customCount) {
      if (+customCount * 4 < +customWidth * +customHeight) {
        sweeper.setCustom(+customWidth, +customHeight, +customCount)
        setShouldCustomDialogShow(false)
      }
    }

    event.preventDefault();
    event.stopPropagation();
  }


  useEffect(() => {
    sweeper.ctx = canvasRef.current?.getContext('2d')
    sweeper.reset()
  }, [])

  useEffect(() => {
    sweeper.draw()
  })

  useEffect(() => {
    setCustomWidth('')
    setCustomHeight('')
    setCustomCount('')
  }, [shouldCustomDialogShow])

  const customDialog = (
    <Window 
      style={{
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
      }}
      customCloseHandler={() => {
        setShouldCustomDialogShow(false)
      }}
    >
      <form className='sweeper-custom-form'>
        <label><span>宽度:</span><input type="number" value={customWidth} onChange={(e) => {setCustomWidth(e.target.value)}}/></label>
        <label><span>高度:</span><input type="number" value={customHeight} onChange={(e) => {setCustomHeight(e.target.value)}} /></label>
        <label><span>数量:</span><input type="number" value={customCount} onChange={(e) => {setCustomCount(e.target.value)}} /></label>
        <button onClick={customConfirmHandler}>确认</button>
      </form>
    </Window>
  )

  return (
    <>
      {shouldCustomDialogShow && customDialog}
      <canvas 
        ref={canvasRef} 
        {...{width, height}} 
        onMouseDown={(event) => {
          const {button} = event;
          const {offsetX, offsetY} = event.nativeEvent
          sweeper.mouseDown(button, offsetX, offsetY)
        }}
        onMouseUp={(event) => {
          const {button} = event;
          const {offsetX, offsetY} = event.nativeEvent
          sweeper.mouseUp(button, offsetX, offsetY)
        }}
      ></canvas>
    </>
  )
}


const app = {
  symbol: Symbol('sweeper'),
  component: (
    <Window
      rememberPosition={true}
      name='扫雷'
    >
      <Sweeper />
    </Window>
  ),
  name: '扫雷',
  icon: icon,
  menu: [{
    fieldId: 1,
    fieldName: 'Sweeper',
    children: [
      {
        fieldId: 101,
        fieldName: '新游戏',
        parentId: 1,
        parentName: 'Sweeper',
        event: () => {
          sweeper.setShouldCustomDialogShow(false)
          sweeper.reset()
          sweeper.draw()
        }
      }, 
      {
        divider: true,
      },
      {
        fieldId: 102,
        fieldName: '简单',
        parentId: 1,
        parentName: 'Sweeper',
        event: () => {
          sweeper.setShouldCustomDialogShow(false)
          sweeper.setEasy()
          sweeper.draw()
        }
      }, 
      {
        fieldId: 103,
        fieldName: '中等',
        parentId: 1,
        parentName: 'Sweeper',
        event: () => {
          sweeper.setShouldCustomDialogShow(false)
          sweeper.setMedium()
          sweeper.draw()
        }
      }, 
      {
        fieldId: 104,
        fieldName: '困难',
        parentId: 1,
        parentName: 'Sweeper',
        event: () => {
          sweeper.setShouldCustomDialogShow(false)
          sweeper.setHard()
          sweeper.draw()
        }
      }, 
      {
        divider: true
      }, 
      {
        fieldId: 105,
        fieldName: '自定义…',
        parentId: 1,
        parentName: 'Sweeper',
        event: () => {
          sweeper.setShouldCustomDialogShow(true)
        }
      }
    ]
  }],
}

export default app
