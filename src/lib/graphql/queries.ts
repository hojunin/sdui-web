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
      sections{
        name
        order
        type
        widgets {
          id
          name
          rules
          props
          style
          type
        }
      }
      path
      revision
  }
  }
`);

export const GET_LAYOUT_HISTORY = gql(`
  query GetLayoutHistory($path: String!) {
    layoutHistory(path: $path) {
      id
      path
      revision
      sections {
        name
        order
        type
        widgets {
          id
          name
          type
          rules
          props
          style
        }
      }
    }
  }
`);
