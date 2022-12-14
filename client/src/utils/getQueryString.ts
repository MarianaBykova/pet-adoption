interface IFiltersKeys {
  [key: string]: Array<string> | undefined,
}

export interface IFilters extends IFiltersKeys {
  type?: Array<string>,
  color?: Array<string>,
  friendliness?: Array<string>,
  activity?: Array<string>,
}

export function getQueryString(filters: object[]): IFilters {
  let map: IFilters = {}
  for (let i = 0; i < filters.length; i++) {
    
    for (let key in filters[i]) {
      
      if (!map[key]) map[key] = Object.values(filters[i])
      else {
        map[key]?.push(Object.values(filters[i]).join(''))
      }
    }
  }

  return map;
};
