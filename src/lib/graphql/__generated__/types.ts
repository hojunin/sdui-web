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
