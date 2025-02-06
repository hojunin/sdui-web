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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type CreateLayoutInput = {
  baseTemplateId?: InputMaybe<Scalars['String']['input']>;
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

export type CreateWidgetInput = {
  name: Scalars['String']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
  rules?: InputMaybe<Scalars['JSON']['input']>;
  style?: InputMaybe<Scalars['JSON']['input']>;
  type: WidgetType;
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
  widgetRelations?: Maybe<Array<WidgetLayout>>;
};

export type LayoutSection = {
  __typename?: 'LayoutSection';
  name: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  style?: Maybe<Scalars['JSON']['output']>;
  type: LayoutSectionType;
  widgetNames: Array<Scalars['String']['output']>;
  widgets?: Maybe<Array<Widget>>;
};

export type LayoutSectionInput = {
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
  style?: InputMaybe<Scalars['JSON']['input']>;
  type: LayoutSectionType;
  widgetNames?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The type of layout section */
export enum LayoutSectionType {
  Footer = 'FOOTER',
  Header = 'HEADER',
  Section = 'SECTION'
}

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
  createWidget: Widget;
  removeLayout: Scalars['Boolean']['output'];
  removeMenu: Scalars['Boolean']['output'];
  removeWidget: Scalars['Boolean']['output'];
  rollbackLayout: Layout;
  updateMenu: Menu;
  updateWidget: Widget;
};


export type MutationCreateLayoutArgs = {
  createLayoutInput: CreateLayoutInput;
};


export type MutationCreateMenuArgs = {
  input: CreateMenuInput;
};


export type MutationCreateWidgetArgs = {
  createWidgetInput: CreateWidgetInput;
};


export type MutationRemoveLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMenuArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveWidgetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRollbackLayoutArgs = {
  path: Scalars['String']['input'];
  revision: Scalars['Float']['input'];
};


export type MutationUpdateMenuArgs = {
  input: UpdateMenuInput;
};


export type MutationUpdateWidgetArgs = {
  updateWidgetInput: UpdateWidgetInput;
};

export type Query = {
  __typename?: 'Query';
  layout: Layout;
  layoutByPath: Layout;
  layoutHistory: Array<Layout>;
  layoutTemplates: Array<Layout>;
  layouts: Array<Layout>;
  menu: Menu;
  menus: Array<Menu>;
  previewLayout: Layout;
  widget: Widget;
  widgetHistory: Array<Widget>;
  widgets: Array<Widget>;
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


export type QueryPreviewLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWidgetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWidgetHistoryArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateMenuInput = {
  id: Scalars['Int']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWidgetInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  rules?: InputMaybe<Scalars['JSON']['input']>;
  style?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<WidgetType>;
};

export type Widget = {
  __typename?: 'Widget';
  childRelations?: Maybe<Array<WidgetRelation>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  layoutRelations?: Maybe<Array<WidgetLayout>>;
  name: Scalars['String']['output'];
  parentRelations?: Maybe<Array<WidgetRelation>>;
  props?: Maybe<Scalars['JSON']['output']>;
  revision: Scalars['Float']['output'];
  rules?: Maybe<Scalars['JSON']['output']>;
  style?: Maybe<Scalars['JSON']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type WidgetLayout = {
  __typename?: 'WidgetLayout';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  layout?: Maybe<Layout>;
  layoutId?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  sectionName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  widget: Widget;
  widgetId: Scalars['String']['output'];
};

export type WidgetRelation = {
  __typename?: 'WidgetRelation';
  childWidget: Widget;
  childWidgetId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Float']['output'];
  parentWidget: Widget;
  parentWidgetId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** The supported widget types */
export enum WidgetType {
  Accordion = 'ACCORDION',
  Alert = 'ALERT',
  AlertDialog = 'ALERT_DIALOG',
  AspectRatio = 'ASPECT_RATIO',
  Avatar = 'AVATAR',
  Badge = 'BADGE',
  Breadcrumb = 'BREADCRUMB',
  Button = 'BUTTON',
  Calendar = 'CALENDAR',
  Card = 'CARD',
  Carousel = 'CAROUSEL',
  Checkbox = 'CHECKBOX',
  Collapsible = 'COLLAPSIBLE',
  Combobox = 'COMBOBOX',
  Command = 'COMMAND',
  ContextMenu = 'CONTEXT_MENU',
  Custom = 'CUSTOM',
  DataTable = 'DATA_TABLE',
  DatePicker = 'DATE_PICKER',
  Dialog = 'DIALOG',
  Drawer = 'DRAWER',
  DropdownMenu = 'DROPDOWN_MENU',
  Form = 'FORM',
  HoverCard = 'HOVER_CARD',
  Input = 'INPUT',
  Label = 'LABEL',
  Menubar = 'MENUBAR',
  NavigationMenu = 'NAVIGATION_MENU',
  Popover = 'POPOVER',
  Progress = 'PROGRESS',
  RadioGroup = 'RADIO_GROUP',
  ScrollArea = 'SCROLL_AREA',
  Select = 'SELECT',
  Separator = 'SEPARATOR',
  Sheet = 'SHEET',
  Skeleton = 'SKELETON',
  Slider = 'SLIDER',
  Switch = 'SWITCH',
  Table = 'TABLE',
  Tabs = 'TABS',
  Textarea = 'TEXTAREA',
  Toast = 'TOAST',
  Toggle = 'TOGGLE',
  Tooltip = 'TOOLTIP'
}

export type GetMenusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenusQuery = { __typename?: 'Query', menus: Array<{ __typename?: 'Menu', id: string, label: string, path: string, order: number, depth: number, children?: Array<{ __typename?: 'Menu', id: string, label: string, path: string, order: number, children?: Array<{ __typename?: 'Menu', id: string, label: string, path: string, order: number }> | null }> | null }> };

export type GetLayoutByPathQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetLayoutByPathQuery = { __typename?: 'Query', layoutByPath: { __typename?: 'Layout', id: string, path: string, revision: number, sections: Array<{ __typename?: 'LayoutSection', name: string, order: number, type: LayoutSectionType, widgets?: Array<{ __typename?: 'Widget', id: string, name: string, rules?: any | null, props?: any | null, style?: any | null, type: string }> | null }> } };

export type GetLayoutHistoryQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetLayoutHistoryQuery = { __typename?: 'Query', layoutHistory: Array<{ __typename?: 'Layout', id: string, path: string, revision: number, sections: Array<{ __typename?: 'LayoutSection', name: string, order: number, type: LayoutSectionType, widgets?: Array<{ __typename?: 'Widget', id: string, name: string, type: string, rules?: any | null, props?: any | null, style?: any | null }> | null }> }> };


export const GetMenusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMenus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMenusQuery, GetMenusQueryVariables>;
export const GetLayoutByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLayoutByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layoutByPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"widgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"props"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}}]}}]}}]} as unknown as DocumentNode<GetLayoutByPathQuery, GetLayoutByPathQueryVariables>;
export const GetLayoutHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLayoutHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layoutHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"widgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"props"}},{"kind":"Field","name":{"kind":"Name","value":"style"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLayoutHistoryQuery, GetLayoutHistoryQueryVariables>;