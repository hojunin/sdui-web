export interface Menu {
  id: string;
  label: string;
  path: string;
  order: number;
  depth: number;
  children: Menu[];
}

export interface MenusResponse {
  menus: Menu[];
}
