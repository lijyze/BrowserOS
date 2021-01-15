export interface Divider {
  divider: true,
}

export type MenuData = {
  fieldId: number,
  fieldName: string,
  parentId?: number,
  parentName?: string,
  children?: (MenuData | Divider)[],
  event?: () => {}
}


export const divider: Divider = {
  divider: true
}

export const systemIconData = {
  fieldId: 1000,
  fieldName: '',
  children: [
    {
      fieldId: 100001,
      fieldName: '关于',
      parentId: 1000,
      parentName: '',
    }, 
    divider, 
    {
      fieldId: 100002,
      fieldName: '系统偏好设置…',
      parentId: 1000,
      parentName: '',
    }, 
    divider, 
    {
      fieldId: 100003,
      fieldName: '最近使用的项目',
      parentId: 1000,
      parentName: '',
    }, 
    divider,
    {
      fieldId: 100004,
      fieldName: '锁定屏幕',
      parentId: 1000,
      parentName: '',
    }, 
    {
      fieldId: 100005,
      fieldName: '退出登陆',
      parentId: 1000,
      parentName: '',
    }, 
  ]
}

// TODO: 系统默认(Finder)的菜单栏，后续会放到app-Finder中
export const defaultMenuData: (MenuData | Divider)[] = [
  {
    fieldId: 2,
    fieldName: 'Finder',
    children: [
      {
        fieldId: 201,
        fieldName: '关于 Finder',
        parentId: 2,
        parentName: 'Finder',
      }, 
      divider,
      {
        fieldId: 202,
        fieldName: '偏好设置…',
        parentId: 2,
        parentName: 'Finder',
      }, 
      divider,
      {
        fieldId: 203,
        fieldName: '清倒废纸篓',
        parentId: 2,
        parentName: 'Finder',
      }, 
    ]
  },
  {
    fieldId: 3,
    fieldName: '文件',
    children: [
      {
        fieldId: 301,
        fieldName: '新建 Finder 窗口',
        parentId: 3,
        parentName: '文件',
      }, 
      {
        fieldId: 302,
        fieldName: '新建文件夹',
        parentId: 3,
        parentName: '文件',
      }, 
    ]
  },
  // {
  //   fieldId: 4,
  //   fieldName: '编辑',
  //   children: []
  // },
  // {
  //   fieldId: 5,
  //   fieldName: '显示',
  //   children: []
  // },
  {
    fieldId: 6,
    fieldName: '前往',
    children: [
      {
        fieldId: 601,
        fieldName: '上层文件夹',
        parentId: 6,
        parentName: '前往',
      }, 
      divider, 
      {
        fieldId: 602,
        fieldName: '最近使用的文件夹',
        parentId: 6,
        parentName: '前往',
      }, 
    ]
  },
  // {
  //   fieldId: 7,
  //   fieldName: '窗口',
  //   children: []
  // },
  {
    fieldId: 8,
    fieldName: '帮助',
    children: [
      {
        fieldId: 801,
        fieldName: '报告问题',
        parentId: 8,
        parentName: '帮助',
      }, 
    ]
  },
]

// 菜单栏右侧工具的数据
export const menuToolData = [

]