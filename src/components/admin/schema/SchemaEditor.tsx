"use client";

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { SchemaField, JsonSchema } from './types';
import { SchemaFieldComponent } from './SchemaField';
import { parseSchemaToFields, fieldsToZodSchema, getInitialExpandedState } from './utils';

interface SchemaEditorProps {
  zodSchema: JsonSchema;
  formConfig: Record<string, unknown>;
  onSave: (zodSchema: JsonSchema, formConfig: Record<string, unknown>) => void;
  isLoading?: boolean;
}

// 스키마 필드 유효성 검사 스키마 정의
const createValidationSchema = () => {
  // 재귀적으로 중첩된 필드를 처리하기 위한 스키마
  const fieldValidationSchema: z.ZodType<SchemaField> = z.lazy(() => 
    z.object({
      name: z.string().min(1, "필드명은 필수입니다"),
      type: z.enum(["string", "number", "boolean", "select", "object", "array"]),
      required: z.boolean(),
      options: z.array(z.string()).optional(),
      validation: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        pattern: z.string().optional(),
      }).optional(),
      children: z.array(fieldValidationSchema).optional()
    })
  );

  return z.object({
    schemaFields: z.array(fieldValidationSchema)
  });
};

type SchemaFormValues = {
  schemaFields: SchemaField[];
};

export function SchemaEditor({ zodSchema, formConfig, onSave, isLoading = false }: SchemaEditorProps) {
  // 확장된 필드 상태 관리
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});
  
  // 초기 스키마 필드 추출 및 확장 상태 설정
  const initialSchemaFields = useMemo(() => {
    try {
      const extractedFields = parseSchemaToFields(zodSchema, formConfig);
      return extractedFields;
    } catch (error) {
      console.error("스키마 파싱 오류:", error);
      return [];
    }
  }, [zodSchema, formConfig]);
  
  // 초기 확장 상태 설정
  useEffect(() => {
    setExpandedFields(getInitialExpandedState(initialSchemaFields));
  }, [initialSchemaFields]);
  
  // 유효성 검사 스키마 생성
  const validationSchema = useMemo(() => createValidationSchema(), []);
  
  // react-hook-form 설정
  const form = useForm<SchemaFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      schemaFields: initialSchemaFields
    },
    mode: 'onChange'
  });

  const { 
    handleSubmit, 
    reset, 
    setValue,
    getValues, 
    formState: { isDirty, isValid, isSubmitting, isSubmitted }
  } = form;

  // 필드 추가 함수
  const addField = (parentPath: string[] = []) => {
    const newField: SchemaField = {
      name: `field_${Date.now()}`,
      type: 'string',
      required: false,
    };
    
    const currentFields = getValues().schemaFields;
    
    if (parentPath.length === 0) {
      // 루트 레벨에 필드 추가
      const updatedFields = [...currentFields, newField];
      setValue('schemaFields', updatedFields, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    } else {
      // 중첩 필드 추가
      const updatedFields = [...currentFields];
      let current = updatedFields;
      let parent;
      
      for (let i = 0; i < parentPath.length; i++) {
        const index = parseInt(parentPath[i]);
        parent = current;
        current = current[index].children || [];
      }
      
      if (parent && parent[parseInt(parentPath[parentPath.length - 1])]) {
        if (!parent[parseInt(parentPath[parentPath.length - 1])].children) {
          parent[parseInt(parentPath[parentPath.length - 1])].children = [];
        }
        parent[parseInt(parentPath[parentPath.length - 1])].children!.push(newField);
      }
      
      setValue('schemaFields', updatedFields, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
  };
  
  // 필드 삭제 함수
  const removeField = (path: string[]) => {
    if (path.length === 0) return;
    
    const currentFields = getValues().schemaFields;
    const updatedFields = [...currentFields];
    
    if (path.length === 1) {
      updatedFields.splice(parseInt(path[0]), 1);
    } else {
      let current = updatedFields;
      let parent;
      
      for (let i = 0; i < path.length - 1; i++) {
        const index = parseInt(path[i]);
        parent = current;
        current = current[index].children || [];
      }
      
      if (parent) {
        const lastIndex = parseInt(path[path.length - 1]);
        parent[parseInt(path[path.length - 2])].children!.splice(lastIndex, 1);
      }
    }
    
    setValue('schemaFields', updatedFields, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };
  
  // 필드 업데이트 함수
  const updateField = (path: string[], updates: Partial<SchemaField>) => {
    const currentFields = getValues().schemaFields;
    const updatedFields = [...currentFields];
    
    if (path.length === 1) {
      const index = parseInt(path[0]);
      updatedFields[index] = { ...updatedFields[index], ...updates };
    } else {
      let current = updatedFields;
      
      for (let i = 0; i < path.length - 1; i++) {
        const index = parseInt(path[i]);
        current = current[index].children || [];
      }
      
      const lastIndex = parseInt(path[path.length - 1]);
      current[lastIndex] = { ...current[lastIndex], ...updates };
    }
    
    setValue('schemaFields', updatedFields, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };
  
  // 필드 확장/축소 토글 함수
  const toggleExpand = (path: string) => {
    setExpandedFields({
      ...expandedFields,
      [path]: !expandedFields[path]
    });
  };
  
  // 스키마 저장 함수
  const onSubmit = (data: SchemaFormValues) => {
    const newZodSchema = fieldsToZodSchema(data.schemaFields);
    
    // formConfig 생성
    const newFormConfig: Record<string, unknown> = {};
    data.schemaFields.forEach(field => {
      newFormConfig[field.name] = {
        label: field.name,
        type: field.type
      };
    });
    
    onSave(newZodSchema, newFormConfig);
  };
  
  // 스키마 초기화 함수
  const resetSchema = () => {
    reset({ schemaFields: initialSchemaFields });
  };

  // 폼이 초기화되었는지 확인
  const isInitialized = initialSchemaFields.length > 0 || isSubmitted;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>폼 설정</CardTitle>
              <CardDescription>
                폼 구성 및 검증 규칙을 수정합니다.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => addField()}
              >
                필드 추가
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetSchema}
                disabled={!isDirty}
              >
                초기화
              </Button>
              <Button
                type="submit"
                disabled={!isDirty || !isValid || isLoading || isSubmitting}
              >
                {isLoading || isSubmitting ? '저장 중...' : '저장'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!isInitialized ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="schemaFields"
                render={() => (
                  <FormItem>
                    <div className="space-y-2">
                      {getValues().schemaFields.map((field, index) => (
                        <SchemaFieldComponent
                          key={index}
                          field={field}
                          path={[index.toString()]}
                          expandedFields={expandedFields}
                          onToggleExpand={toggleExpand}
                          onUpdateField={updateField}
                          onAddField={addField}
                          onRemoveField={removeField}
                        />
                      ))}
                      {getValues().schemaFields.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>필드가 없습니다. &apos;필드 추가&apos; 버튼을 클릭하여 필드를 추가하세요.</p>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
} 