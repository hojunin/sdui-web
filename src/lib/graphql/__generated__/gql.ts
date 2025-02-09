/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetMenus {\n    menus {\n      id\n      label\n      path\n      order\n      depth\n      children {\n        id\n        label\n        path\n        order\n        children {\n          id\n          label\n          path\n          order\n        }\n      }\n    }\n  }\n": typeof types.GetMenusDocument,
    "\n  query GetLayoutByPath($path: String!) {\n    layoutByPath(path: $path) {\n      id\n      sections{\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          rules\n          props\n          style\n          type\n        }\n      }\n      path\n      revision\n  }\n  }\n": typeof types.GetLayoutByPathDocument,
    "\n  query GetLayoutHistory($path: String!) {\n    layoutHistory(path: $path) {\n      id\n      path\n      revision\n      sections {\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          type\n          rules\n          props\n          style\n        }\n      }\n    }\n  }\n": typeof types.GetLayoutHistoryDocument,
    "\n  query GetWidgets {\n    widgets {\n      id\n      name\n      type\n      rules\n      props\n      style\n      revision\n    }\n  }\n": typeof types.GetWidgetsDocument,
};
const documents: Documents = {
    "\n  query GetMenus {\n    menus {\n      id\n      label\n      path\n      order\n      depth\n      children {\n        id\n        label\n        path\n        order\n        children {\n          id\n          label\n          path\n          order\n        }\n      }\n    }\n  }\n": types.GetMenusDocument,
    "\n  query GetLayoutByPath($path: String!) {\n    layoutByPath(path: $path) {\n      id\n      sections{\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          rules\n          props\n          style\n          type\n        }\n      }\n      path\n      revision\n  }\n  }\n": types.GetLayoutByPathDocument,
    "\n  query GetLayoutHistory($path: String!) {\n    layoutHistory(path: $path) {\n      id\n      path\n      revision\n      sections {\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          type\n          rules\n          props\n          style\n        }\n      }\n    }\n  }\n": types.GetLayoutHistoryDocument,
    "\n  query GetWidgets {\n    widgets {\n      id\n      name\n      type\n      rules\n      props\n      style\n      revision\n    }\n  }\n": types.GetWidgetsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMenus {\n    menus {\n      id\n      label\n      path\n      order\n      depth\n      children {\n        id\n        label\n        path\n        order\n        children {\n          id\n          label\n          path\n          order\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMenus {\n    menus {\n      id\n      label\n      path\n      order\n      depth\n      children {\n        id\n        label\n        path\n        order\n        children {\n          id\n          label\n          path\n          order\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLayoutByPath($path: String!) {\n    layoutByPath(path: $path) {\n      id\n      sections{\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          rules\n          props\n          style\n          type\n        }\n      }\n      path\n      revision\n  }\n  }\n"): (typeof documents)["\n  query GetLayoutByPath($path: String!) {\n    layoutByPath(path: $path) {\n      id\n      sections{\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          rules\n          props\n          style\n          type\n        }\n      }\n      path\n      revision\n  }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLayoutHistory($path: String!) {\n    layoutHistory(path: $path) {\n      id\n      path\n      revision\n      sections {\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          type\n          rules\n          props\n          style\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLayoutHistory($path: String!) {\n    layoutHistory(path: $path) {\n      id\n      path\n      revision\n      sections {\n        name\n        order\n        type\n        widgets {\n          id\n          name\n          type\n          rules\n          props\n          style\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetWidgets {\n    widgets {\n      id\n      name\n      type\n      rules\n      props\n      style\n      revision\n    }\n  }\n"): (typeof documents)["\n  query GetWidgets {\n    widgets {\n      id\n      name\n      type\n      rules\n      props\n      style\n      revision\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;