export interface TypeMenu {
  id: string,
  data: TypeMenuData[],
}

interface TypeMenuCommonData {
  fieldId: number,
  fieldName: string,
}

export interface TypeMenuData extends TypeMenuCommonData {
  child?: TypeMenuSubData[],
}

interface TypeMenuSubData extends TypeMenuCommonData {
  parentId: number,
  parentName: string,
  child?: TypeMenuSubData[],
}
