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

export type CreateFormValidationSchemaInput = {
  description: Scalars['String']['input'];
  formConfig: Scalars['JSON']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  preprocess?: InputMaybe<Scalars['JSON']['input']>;
  transformers?: InputMaybe<Scalars['JSON']['input']>;
  zodSchema: Scalars['JSON']['input'];
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
  type: Scalars['String']['input'];
};

export type FormConfigResponse = {
  __typename?: 'FormConfigResponse';
  formConfig: Scalars['JSON']['output'];
  zodSchema: Scalars['JSON']['output'];
};

export type FormValidationSchemaType = {
  __typename?: 'FormValidationSchemaType';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  formConfig: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isPublished: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  preprocess?: Maybe<Scalars['JSON']['output']>;
  revision: Scalars['Float']['output'];
  transformers?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  zodSchema: Scalars['JSON']['output'];
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
  widgetTypes: Array<Scalars['String']['output']>;
  widgets?: Maybe<Array<Widget>>;
};

export type LayoutSectionInput = {
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
  style?: InputMaybe<Scalars['JSON']['input']>;
  type: LayoutSectionType;
  widgetTypes?: InputMaybe<Array<Scalars['String']['input']>>;
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
  activateFormValidationSchema: FormValidationSchemaType;
  createFormValidationSchema: FormValidationSchemaType;
  createLayout: Layout;
  createMenu: Menu;
  createWidget: Widget;
  deactivateFormValidationSchema: FormValidationSchemaType;
  deleteFormValidationSchema: Scalars['Boolean']['output'];
  publishFormValidationSchema: FormValidationSchemaType;
  removeLayout: Scalars['Boolean']['output'];
  removeMenu: Scalars['Boolean']['output'];
  removeWidget: Scalars['Boolean']['output'];
  rollbackLayout: Layout;
  unpublishFormValidationSchema: FormValidationSchemaType;
  updateMenu: Menu;
  updateWidget: Widget;
};


export type MutationActivateFormValidationSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateFormValidationSchemaArgs = {
  input: CreateFormValidationSchemaInput;
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


export type MutationDeactivateFormValidationSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFormValidationSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPublishFormValidationSchemaArgs = {
  id: Scalars['ID']['input'];
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


export type MutationUnpublishFormValidationSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateMenuArgs = {
  input: UpdateMenuInput;
};


export type MutationUpdateWidgetArgs = {
  updateWidgetInput: UpdateWidgetInput;
};

export type Query = {
  __typename?: 'Query';
  formConfig: FormConfigResponse;
  formValidationSchema: FormValidationSchemaType;
  formValidationSchemaByName: FormValidationSchemaType;
  formValidationSchemaVersions: Array<FormValidationSchemaType>;
  formValidationSchemas: Array<FormValidationSchemaType>;
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
  zodSchema: ZodSchemaResponse;
};


export type QueryFormConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFormValidationSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFormValidationSchemaByNameArgs = {
  name: Scalars['String']['input'];
  revision?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryFormValidationSchemaVersionsArgs = {
  name: Scalars['String']['input'];
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


export type QueryZodSchemaArgs = {
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
  type?: InputMaybe<Scalars['String']['input']>;
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

export type ZodSchemaResponse = {
  __typename?: 'ZodSchemaResponse';
  schema: Scalars['JSON']['output'];
};

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

export type GetWidgetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWidgetsQuery = { __typename?: 'Query', widgets: Array<{ __typename?: 'Widget', id: string, name: string, type: string, rules?: any | null, props?: any | null, style?: any | null, revision: number }> };

export type GetProductSearchFormQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetProductSearchFormQuery = { __typename?: 'Query', formValidationSchemaByName: { __typename?: 'FormValidationSchemaType', id: string, name: string, description: string, revision: number, isActive: boolean, isPublished: boolean, zodSchema: any, formConfig: any, createdAt: any, updatedAt: any } };

export type GetFormValidationSchemasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormValidationSchemasQuery = { __typename?: 'Query', formValidationSchemas: Array<{ __typename?: 'FormValidationSchemaType', id: string, name: string, description: string, revision: number, isActive: boolean, isPublished: boolean, createdAt: any, updatedAt: any }> };

export type GetFormValidationSchemaQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFormValidationSchemaQuery = { __typename?: 'Query', formValidationSchema: { __typename?: 'FormValidationSchemaType', id: string, name: string, description: string, revision: number, isActive: boolean, isPublished: boolean, zodSchema: any, formConfig: any, createdAt: any, updatedAt: any } };

export type CreateFormValidationSchemaMutationVariables = Exact<{
  input: CreateFormValidationSchemaInput;
}>;


export type CreateFormValidationSchemaMutation = { __typename?: 'Mutation', createFormValidationSchema: { __typename?: 'FormValidationSchemaType', id: string, name: string, description: string, revision: number, isActive: boolean, isPublished: boolean, zodSchema: any, formConfig: any, createdAt: any, updatedAt: any } };

export type DeleteFormValidationSchemaMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteFormValidationSchemaMutation = { __typename?: 'Mutation', deleteFormValidationSchema: boolean };


export const GetMenusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMenus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMenusQuery, GetMenusQueryVariables>;
export const GetLayoutByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLayoutByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layoutByPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"widgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"props"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}}]}}]}}]} as unknown as DocumentNode<GetLayoutByPathQuery, GetLayoutByPathQueryVariables>;
export const GetLayoutHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLayoutHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layoutHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"widgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"props"}},{"kind":"Field","name":{"kind":"Name","value":"style"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLayoutHistoryQuery, GetLayoutHistoryQueryVariables>;
export const GetWidgetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWidgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"widgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"props"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}}]}}]}}]} as unknown as DocumentNode<GetWidgetsQuery, GetWidgetsQueryVariables>;
export const GetProductSearchFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductSearchForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formValidationSchemaByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"zodSchema"}},{"kind":"Field","name":{"kind":"Name","value":"formConfig"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductSearchFormQuery, GetProductSearchFormQueryVariables>;
export const GetFormValidationSchemasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormValidationSchemas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formValidationSchemas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFormValidationSchemasQuery, GetFormValidationSchemasQueryVariables>;
export const GetFormValidationSchemaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormValidationSchema"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formValidationSchema"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"zodSchema"}},{"kind":"Field","name":{"kind":"Name","value":"formConfig"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFormValidationSchemaQuery, GetFormValidationSchemaQueryVariables>;
export const CreateFormValidationSchemaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFormValidationSchema"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFormValidationSchemaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFormValidationSchema"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"zodSchema"}},{"kind":"Field","name":{"kind":"Name","value":"formConfig"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateFormValidationSchemaMutation, CreateFormValidationSchemaMutationVariables>;
export const DeleteFormValidationSchemaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFormValidationSchema"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFormValidationSchema"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFormValidationSchemaMutation, DeleteFormValidationSchemaMutationVariables>;