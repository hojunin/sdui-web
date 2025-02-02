import { gql } from "./__generated__";

export const GET_MENUS = gql(`
  query GetMenus {
    menus {
      id
      label
      path
      order
      depth
      children {
        id
        label
        path
        order
        children {
          id
          label
          path
          order
        }
      }
    }
  }
`);

export const GET_LAYOUT_BY_PATH = gql(`
  query GetLayoutByPath($path: String!) {
    layoutByPath(path: $path) {
      id
      sections {
        name
        order
        type
        children
      }
      path
      revision
    }
  }
`);
