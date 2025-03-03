"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { JsonSchema, ZodTypeInfo } from './types';

interface SchemaViewerProps {
  zodSchema: JsonSchema;
}

interface ValidationInfo {
  type: string;
  value: string | number;
  message: string;
}

interface FieldInfo {
  name: string;
  type: string;
  isOptional: boolean;
  validations: ValidationInfo[];
  children?: FieldInfo[];
}

export function SchemaViewer({ zodSchema }: SchemaViewerProps) {
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});

  // 스키마에서 필드 정보 추출
  const extractFieldsInfo = (schema: JsonSchema): FieldInfo[] => {
    const fields: FieldInfo[] = [];

    if (typeof schema.type === 'object' && schema.type.type === 'object' && schema.type.shape) {
      const typeInfo = schema.type as ZodTypeInfo;
      const shape = typeInfo.shape || {};

      Object.entries(shape).forEach(([key, fieldInfo]) => {
        const fieldType = fieldInfo.type?.type || 'string';
        const isOptional = fieldInfo.optional === true;
        
        const validations: ValidationInfo[] = [];
        
        // 유효성 검사 정보 추출
        if (fieldInfo.type?.validation) {
          if (fieldInfo.type.validation.min) {
            validations.push({
              type: '최소값',
              value: fieldInfo.type.validation.min.value,
              message: fieldInfo.type.validation.min.message
            });
          }
          
          if (fieldInfo.type.validation.max) {
            validations.push({
              type: '최대값',
              value: fieldInfo.type.validation.max.value,
              message: fieldInfo.type.validation.max.message
            });
          }
          
          if (fieldInfo.type.validation.regex) {
            validations.push({
              type: '정규식',
              value: fieldInfo.type.validation.regex.pattern,
              message: fieldInfo.type.validation.regex.message
            });
          }
        }
        
        const field: FieldInfo = {
          name: key,
          type: fieldType,
          isOptional,
          validations
        };
        
        // 객체 타입인 경우 재귀적으로 처리
        if (fieldType === 'object' && fieldInfo.type?.shape) {
          field.children = extractFieldsInfo({ type: fieldInfo.type });
        }
        
        fields.push(field);
      });
    }
    
    return fields;
  };

  const fields = extractFieldsInfo(zodSchema);

  // 필드 확장/축소 토글 함수
  const toggleExpand = (path: string): void => {
    setExpandedFields({
      ...expandedFields,
      [path]: !expandedFields[path]
    });
  };

  // 필드 렌더링 함수
  const renderField = (field: FieldInfo, path: string = '', depth: number = 0): React.ReactNode => {
    const isExpanded = expandedFields[path] || false;
    const hasChildren = field.children && field.children.length > 0;
    const fieldPath = path ? `${path}.${field.name}` : field.name;
    
    return (
      <>
        <TableRow key={fieldPath} className={depth > 0 ? 'bg-muted/30' : ''}>
          <TableCell className="font-medium">
            <div className="flex items-center">
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => toggleExpand(fieldPath)}
                  className="p-1 mr-1 rounded-md hover:bg-muted"
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              )}
              <span style={{ marginLeft: `${depth * 12}px` }}>{field.name}</span>
            </div>
          </TableCell>
          <TableCell>
            <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium">{field.type}</span>
          </TableCell>
          <TableCell>
            {field.isOptional ? (
              <span className="px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs font-medium">선택</span>
            ) : (
              <span className="px-2 py-1 rounded-md bg-red-100 text-red-800 text-xs font-medium">필수</span>
            )}
          </TableCell>
          <TableCell>
            {field.validations.length > 0 ? (
              <div className="space-y-1">
                {field.validations.map((validation, index) => (
                  <div key={index} className="text-xs">
                    <span className="font-semibold">{validation.type}:</span> {validation.value}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground text-xs">없음</span>
            )}
          </TableCell>
          <TableCell>
            {field.validations.length > 0 ? (
              <div className="space-y-1">
                {field.validations.map((validation, index) => (
                  <div key={index} className="text-xs">
                    {validation.message}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground text-xs">없음</span>
            )}
          </TableCell>
        </TableRow>
        
        {/* 자식 필드 렌더링 */}
        {isExpanded && hasChildren && field.children!.map(childField => 
          renderField(childField, fieldPath, depth + 1)
        )}
      </>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>스키마 구조</CardTitle>
        <CardDescription>
          폼 검증에 사용되는 스키마의 구조와 유효성 검사 규칙입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {fields.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">필드명</TableHead>
                <TableHead className="w-[100px]">타입</TableHead>
                <TableHead className="w-[80px]">필수 여부</TableHead>
                <TableHead className="w-[200px]">유효성 검사</TableHead>
                <TableHead>에러 메시지</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map(field => renderField(field))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>스키마 정보가 없습니다.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 