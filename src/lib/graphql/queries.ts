import { gql } from '@apollo/client';

export const GET_MENUS = gql`
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
`;
