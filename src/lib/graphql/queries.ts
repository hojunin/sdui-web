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

export const GET_WIDGETS = gql(`
  query GetWidgets {
    widgets {
      id
      name
      type
      rules
      props
      style
      revision
    }
  }
`);

export const GET_PRODUCT_SEARCH_FORM = gql(`
  query GetProductSearchForm($name: String!) {
    formValidationSchemaByName(name: $name) {
      id
      name
      description
      revision
      isActive
      isPublished
      zodSchema
      formConfig
      createdAt
      updatedAt
    }
  }
`);

export const GET_FORM_VALIDATION_SCHEMAS = gql(`
  query GetFormValidationSchemas {
    formValidationSchemas {
      id
      name
      description
      revision
      isActive
      isPublished
      createdAt
      updatedAt
    }
  }
`);

export const GET_FORM_VALIDATION_SCHEMA = gql(`
  query GetFormValidationSchema($id: ID!) {
    formValidationSchema(id: $id) {
      id
      name
      description
      revision
      isActive
      isPublished
      zodSchema
      formConfig
      createdAt
      updatedAt
    }
  }
`);

export const CREATE_FORM_VALIDATION_SCHEMA = gql(`
  mutation CreateFormValidationSchema($input: CreateFormValidationSchemaInput!) {
    createFormValidationSchema(input: $input) {
      id
      name
      description
      revision
      isActive
      isPublished
      zodSchema
      formConfig
      createdAt
      updatedAt
    }
  }
`);

export const DELETE_FORM_VALIDATION_SCHEMA = gql(`
  mutation DeleteFormValidationSchema($id: ID!) {
    deleteFormValidationSchema(id: $id)
  }
`);
