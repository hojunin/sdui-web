/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateLayoutInput = {
  baseTemplateId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isTemplate?: Scalars['Boolean']['input'];
  path: Scalars['String']['input'];
  sections: Array<LayoutSectionInput>;
  templateDescription?: InputMaybe<Scalars['String']['input']>;
  templateName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMenuInput = {
  label: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  path: Scalars['String']['input'];
};

export type Layout = {
  __typename?: 'Layout';
  baseTemplateId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isTemplate: Scalars['Boolean']['output'];
  path: Scalars['String']['output'];
  revision: Scalars['Float']['output'];
  sections: Array<LayoutSection>;
  templateDescription?: Maybe<Scalars['String']['output']>;
  templateName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LayoutSection = {
  __typename?: 'LayoutSection';
  children: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  style?: Maybe<LayoutStyle>;
  type: LayoutSectionType;
};

export type LayoutSectionInput = {
  children?: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
  style?: InputMaybe<LayoutStyleInput>;
  type: LayoutSectionType;
};

/** The type of layout section */
export enum LayoutSectionType {
  Footer = 'FOOTER',
  Header = 'HEADER',
  Section = 'SECTION'
}

export type LayoutStyle = {
  __typename?: 'LayoutStyle';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['String']['output']>;
  margin?: Maybe<Scalars['String']['output']>;
  padding?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['String']['output']>;
};

export type LayoutStyleInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['String']['input']>;
  margin?: InputMaybe<Scalars['String']['input']>;
  padding?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};

export type Menu = {
  __typename?: 'Menu';
  children?: Maybe<Array<Menu>>;
  createdAt: Scalars['DateTime']['output'];
  depth: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  parent?: Maybe<Menu>;
  path: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLayout: Layout;
  createMenu: Menu;
  removeLayout: Scalars['Boolean']['output'];
  removeMenu: Scalars['Boolean']['output'];
  updateLayout: Layout;
  updateMenu: Menu;
};


export type MutationCreateLayoutArgs = {
  createLayoutInput: CreateLayoutInput;
};


export type MutationCreateMenuArgs = {
  input: CreateMenuInput;
};


export type MutationRemoveLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMenuArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateLayoutArgs = {
  updateLayoutInput: UpdateLayoutInput;
};


export type MutationUpdateMenuArgs = {
  input: UpdateMenuInput;
};

export type Query = {
  __typename?: 'Query';
  layout: Layout;
  layoutByPath: Layout;
  layoutHistory: Array<Layout>;
  layouts: Array<Layout>;
  menu: Menu;
  menus: Array<Menu>;
};


export type QueryLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayoutByPathArgs = {
  path: Scalars['String']['input'];
};


export type QueryLayoutHistoryArgs = {
  path: Scalars['String']['input'];
};


export type QueryMenuArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateLayoutInput = {
  baseTemplateId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<Array<LayoutSectionInput>>;
  templateDescription?: InputMaybe<Scalars['String']['input']>;
  templateName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMenuInput = {
  id: Scalars['Int']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};

export type GetMenusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenusQuery = { __typename?: 'Query', menus: Array<{ __typename?: 'Menu', id: string, label: string, path: string, order: number, depth: number, children?: Array<{ __typename?: 'Menu', id: string, label: string, path: string, order: number, children?: Array<{ __typename?: 'Menu', id: string, label: string, path: string, order: number }> | null }> | null }> };

export type GetLayoutByPathQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetLayoutByPathQuery = { __typename?: 'Query', layoutByPath: { __typename?: 'Layout', id: string, path: string, revision: number, sections: Array<{ __typename?: 'LayoutSection', name: string, order: number, type: LayoutSectionType, children: Array<string> }> } };

export type GetLayoutHistoryQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetLayoutHistoryQuery = { __typename?: 'Query', layoutHistory: Array<{ __typename?: 'Layout', id: string, path: string, revision: number, sections: Array<{ __typename?: 'LayoutSection', name: string, order: number, type: LayoutSectionType, children: Array<string> }> }> };


export const GetMenusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMenus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMenusQuery, GetMenusQueryVariables>;
export const GetLayoutByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLayoutByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layoutByPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"children"}}]}}]}}]}}]} as unknown as DocumentNode<GetLayoutByPathQuery, GetLayoutByPathQueryVariables>;
export const GetLayoutHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLayoutHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layoutHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"children"}}]}}]}}]}}]} as unknown as DocumentNode<GetLayoutHistoryQuery, GetLayoutHistoryQueryVariables>;