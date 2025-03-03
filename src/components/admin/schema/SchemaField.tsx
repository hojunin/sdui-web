"use client";

import { FieldType, SchemaField, StringValidationType, StringTransformType, ValidationRule } from './types';
import { useFormContext } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Trash, X } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface SchemaFieldProps {
  field: SchemaField;
  path: string[];
  expandedFields: Record<string, boolean>;
  onToggleExpand: (path: string) => void;
  onUpdateField: (path: string[], updates: Partial<SchemaField>) => void;
  onAddField: (parentPath: string[]) => void;
  onRemoveField: (path: string[]) => void;
}

// 문자열 검증 타입 옵션
const STRING_VALIDATION_OPTIONS: { value: StringValidationType; label: string }[] = [
  { value: 'email', label: '이메일' },
  { value: 'url', label: 'URL' },
  { value: 'emoji', label: '이모지' },
  { value: 'uuid', label: 'UUID' },
  { value: 'nanoid', label: 'Nano ID' },
  { value: 'cuid', label: 'CUID' },
  { value: 'cuid2', label: 'CUID2' },
  { value: 'ulid', label: 'ULID' },
  { value: 'datetime', label: '날짜시간 (ISO 8601)' },
  { value: 'date', label: '날짜 (YYYY-MM-DD)' },
  { value: 'time', label: '시간 (HH:mm:ss)' },
  { value: 'duration', label: '기간 (ISO 8601)' },
  { value: 'ip', label: 'IP 주소' },
  { value: 'cidr', label: 'CIDR' },
  { value: 'base64', label: 'Base64' },
  { value: 'regex', label: '정규식' },
  { value: 'includes', label: '포함' },
  { value: 'startsWith', label: '시작 문자열' },
  { value: 'endsWith', label: '종료 문자열' },
];

// 문자열 변환 옵션
const STRING_TRANSFORM_OPTIONS: { value: StringTransformType; label: string }[] = [
  { value: 'trim', label: '공백 제거' },
  { value: 'toLowerCase', label: '소문자 변환' },
  { value: 'toUpperCase', label: '대문자 변환' },
];

export function SchemaFieldComponent({
  field,
  path,
  expandedFields,
  onToggleExpand,
  onUpdateField,
  onAddField,
  onRemoveField
}: SchemaFieldProps) {
  const form = useFormContext();
  const pathString = path.join('.');
  const isExpanded = expandedFields[pathString] || false;
  const fieldPath = `schemaFields[${pathString}]`;
  const [activeTab, setActiveTab] = useState<string>("basic");
  
  // 문자열 검증 규칙 추가
  const addStringValidation = () => {
    const currentValidations = field.validation?.stringValidations || [];
    const newValidation: ValidationRule = {
      type: 'email', // 기본값
      message: '유효하지 않은 형식입니다.'
    };
    
    onUpdateField(path, {
      validation: {
        ...field.validation,
        stringValidations: [...currentValidations, newValidation]
      }
    });
  };
  
  // 문자열 검증 규칙 제거
  const removeStringValidation = (index: number) => {
    const currentValidations = field.validation?.stringValidations || [];
    const updatedValidations = [...currentValidations];
    updatedValidations.splice(index, 1);
    
    onUpdateField(path, {
      validation: {
        ...field.validation,
        stringValidations: updatedValidations
      }
    });
  };
  
  // 문자열 검증 규칙 업데이트
  const updateStringValidation = (index: number, updates: Partial<ValidationRule>) => {
    const currentValidations = field.validation?.stringValidations || [];
    const updatedValidations = [...currentValidations];
    updatedValidations[index] = { ...updatedValidations[index], ...updates };
    
    onUpdateField(path, {
      validation: {
        ...field.validation,
        stringValidations: updatedValidations
      }
    });
  };
  
  // 문자열 변환 토글
  const toggleStringTransform = (transform: StringTransformType) => {
    const currentTransforms = field.validation?.stringTransforms || [];
    let updatedTransforms: StringTransformType[];
    
    if (currentTransforms.includes(transform)) {
      updatedTransforms = currentTransforms.filter(t => t !== transform);
    } else {
      updatedTransforms = [...currentTransforms, transform];
    }
    
    onUpdateField(path, {
      validation: {
        ...field.validation,
        stringTransforms: updatedTransforms
      }
    });
  };
  
  // 에러 메시지 업데이트
  const updateErrorMessage = (key: string, value: string) => {
    onUpdateField(path, {
      validation: {
        ...field.validation,
        errorMessages: {
          ...field.validation?.errorMessages,
          [key]: value
        }
      }
    });
  };
  
  // 특정 검증 규칙에 값이 필요한지 확인
  const validationNeedsValue = (type: StringValidationType): boolean => {
    return ['regex', 'includes', 'startsWith', 'endsWith'].includes(type);
  };
  
  return (
    <div className="border rounded-md p-4 mb-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {(field.type === 'object' || field.type === 'array') && field.children && field.children.length > 0 && (
            <button
              type="button"
              onClick={() => onToggleExpand(pathString)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`${fieldPath}.name`}
                render={({ field: formField }) => (
                  <FormItem className="w-40">
                    <FormControl>
                      <Input
                        {...formField}
                        value={field.name}
                        onChange={(e) => {
                          formField.onChange(e);
                          onUpdateField(path, { name: e.target.value });
                        }}
                        placeholder="필드명"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${fieldPath}.type`}
                render={() => (
                  <FormItem className="w-32">
                    <Select
                      value={field.type}
                      onValueChange={(value) => onUpdateField(path, { type: value as FieldType })}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="타입 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="string">문자열</SelectItem>
                        <SelectItem value="number">숫자</SelectItem>
                        <SelectItem value="boolean">불리언</SelectItem>
                        <SelectItem value="date">날짜</SelectItem>
                        <SelectItem value="select">선택</SelectItem>
                        <SelectItem value="object">객체</SelectItem>
                        <SelectItem value="array">배열</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${fieldPath}.required`}
                render={() => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        id={`required-${pathString}`}
                        checked={field.required}
                        onCheckedChange={(checked) => onUpdateField(path, { required: !!checked })}
                      />
                    </FormControl>
                    <FormLabel htmlFor={`required-${pathString}`}>필수</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(field.type === 'object' || field.type === 'array') && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAddField(path)}
            >
              <Plus size={16} />
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onRemoveField(path)}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
      
      {/* 타입별 추가 설정 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">기본 설정</TabsTrigger>
          {field.type === 'string' && <TabsTrigger value="stringValidations">문자열 검증</TabsTrigger>}
          <TabsTrigger value="errorMessages">에러 메시지</TabsTrigger>
        </TabsList>
        
        {/* 기본 설정 탭 */}
        <TabsContent value="basic">
          {field.type === 'string' && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`${fieldPath}.validation.minLength`}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor={`minLength-${pathString}`}>최소 길이</FormLabel>
                    <FormControl>
                      <Input
                        id={`minLength-${pathString}`}
                        type="number"
                        value={field.validation?.minLength || ''}
                        onChange={(e) => onUpdateField(path, {
                          validation: {
                            ...field.validation,
                            minLength: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${fieldPath}.validation.maxLength`}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor={`maxLength-${pathString}`}>최대 길이</FormLabel>
                    <FormControl>
                      <Input
                        id={`maxLength-${pathString}`}
                        type="number"
                        value={field.validation?.maxLength || ''}
                        onChange={(e) => onUpdateField(path, {
                          validation: {
                            ...field.validation,
                            maxLength: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${fieldPath}.validation.length`}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor={`length-${pathString}`}>정확한 길이</FormLabel>
                    <FormControl>
                      <Input
                        id={`length-${pathString}`}
                        type="number"
                        value={field.validation?.length || ''}
                        onChange={(e) => onUpdateField(path, {
                          validation: {
                            ...field.validation,
                            length: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${fieldPath}.validation.pattern`}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor={`pattern-${pathString}`}>정규식 패턴</FormLabel>
                    <FormControl>
                      <Input
                        id={`pattern-${pathString}`}
                        value={field.validation?.pattern || ''}
                        onChange={(e) => onUpdateField(path, {
                          validation: {
                            ...field.validation,
                            pattern: e.target.value || undefined
                          }
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          
          {field.type === 'number' && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`${fieldPath}.validation.min`}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor={`min-${pathString}`}>최소값</FormLabel>
                    <FormControl>
                      <Input
                        id={`min-${pathString}`}
                        type="number"
                        value={field.validation?.min || ''}
                        onChange={(e) => onUpdateField(path, {
                          validation: {
                            ...field.validation,
                            min: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`${fieldPath}.validation.max`}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor={`max-${pathString}`}>최대값</FormLabel>
                    <FormControl>
                      <Input
                        id={`max-${pathString}`}
                        type="number"
                        value={field.validation?.max || ''}
                        onChange={(e) => onUpdateField(path, {
                          validation: {
                            ...field.validation,
                            max: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          
          {field.type === 'select' && (
            <FormField
              control={form.control}
              name={`${fieldPath}.options`}
              render={() => (
                <FormItem>
                  <FormLabel htmlFor={`options-${pathString}`}>옵션 (쉼표로 구분)</FormLabel>
                  <FormControl>
                    <Input
                      id={`options-${pathString}`}
                      value={field.options?.join(',') || ''}
                      onChange={(e) => onUpdateField(path, {
                        options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                      })}
                    />
                  </FormControl>
                  <FormDescription>
                    각 옵션을 쉼표(,)로 구분하여 입력하세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </TabsContent>
        
        {/* 문자열 검증 탭 */}
        {field.type === 'string' && (
          <TabsContent value="stringValidations">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {STRING_TRANSFORM_OPTIONS.map((option) => (
                  <Badge 
                    key={option.value}
                    variant={field.validation?.stringTransforms?.includes(option.value) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleStringTransform(option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>문자열 검증 규칙</FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addStringValidation}
                  >
                    <Plus size={16} className="mr-1" /> 규칙 추가
                  </Button>
                </div>
                
                {(field.validation?.stringValidations || []).length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>검증 규칙이 없습니다. &apos;규칙 추가&apos; 버튼을 클릭하여 규칙을 추가하세요.</p>
                  </div>
                )}
                
                {(field.validation?.stringValidations || []).map((validation, index) => (
                  <div key={index} className="border rounded-md p-3 space-y-3">
                    <div className="flex justify-between items-center">
                      <FormLabel>검증 규칙 #{index + 1}</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStringValidation(index)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <FormItem>
                        <FormLabel>검증 타입</FormLabel>
                        <Select
                          value={validation.type}
                          onValueChange={(value) => updateStringValidation(index, { type: value })}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="검증 타입 선택" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STRING_VALIDATION_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      {validationNeedsValue(validation.type as StringValidationType) && (
                        <FormItem>
                          <FormLabel>값</FormLabel>
                          <FormControl>
                            <Input
                              value={String(validation.value || '')}
                              onChange={(e) => updateStringValidation(index, { value: e.target.value })}
                              placeholder="검증에 사용할 값"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                      
                      <FormItem className="md:col-span-2">
                        <FormLabel>에러 메시지</FormLabel>
                        <FormControl>
                          <Input
                            value={validation.message || ''}
                            onChange={(e) => updateStringValidation(index, { message: e.target.value })}
                            placeholder="유효하지 않을 때 표시할 메시지"
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        )}
        
        {/* 에러 메시지 탭 */}
        <TabsContent value="errorMessages">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>필수 필드 에러 메시지</FormLabel>
              <FormControl>
                <Input
                  value={field.validation?.errorMessages?.required || ''}
                  onChange={(e) => updateErrorMessage('required', e.target.value)}
                  placeholder="필수 필드입니다."
                />
              </FormControl>
            </FormItem>
            
            {field.type === 'string' && (
              <>
                <FormItem>
                  <FormLabel>최소 길이 에러 메시지</FormLabel>
                  <FormControl>
                    <Input
                      value={field.validation?.errorMessages?.minLength || ''}
                      onChange={(e) => updateErrorMessage('minLength', e.target.value)}
                      placeholder="최소 길이를 충족해야 합니다."
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem>
                  <FormLabel>최대 길이 에러 메시지</FormLabel>
                  <FormControl>
                    <Input
                      value={field.validation?.errorMessages?.maxLength || ''}
                      onChange={(e) => updateErrorMessage('maxLength', e.target.value)}
                      placeholder="최대 길이를 초과할 수 없습니다."
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem>
                  <FormLabel>정확한 길이 에러 메시지</FormLabel>
                  <FormControl>
                    <Input
                      value={field.validation?.errorMessages?.length || ''}
                      onChange={(e) => updateErrorMessage('length', e.target.value)}
                      placeholder="정확한 길이여야 합니다."
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem>
                  <FormLabel>정규식 패턴 에러 메시지</FormLabel>
                  <FormControl>
                    <Input
                      value={field.validation?.errorMessages?.pattern || ''}
                      onChange={(e) => updateErrorMessage('pattern', e.target.value)}
                      placeholder="패턴과 일치해야 합니다."
                    />
                  </FormControl>
                </FormItem>
              </>
            )}
            
            {field.type === 'number' && (
              <>
                <FormItem>
                  <FormLabel>최소값 에러 메시지</FormLabel>
                  <FormControl>
                    <Input
                      value={field.validation?.errorMessages?.min || ''}
                      onChange={(e) => updateErrorMessage('min', e.target.value)}
                      placeholder="최소값 이상이어야 합니다."
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem>
                  <FormLabel>최대값 에러 메시지</FormLabel>
                  <FormControl>
                    <Input
                      value={field.validation?.errorMessages?.max || ''}
                      onChange={(e) => updateErrorMessage('max', e.target.value)}
                      placeholder="최대값 이하여야 합니다."
                    />
                  </FormControl>
                </FormItem>
              </>
            )}
            
            <FormItem>
              <FormLabel>타입 에러 메시지</FormLabel>
              <FormControl>
                <Input
                  value={field.validation?.errorMessages?.type || ''}
                  onChange={(e) => updateErrorMessage('type', e.target.value)}
                  placeholder="올바른 타입이 아닙니다."
                />
              </FormControl>
            </FormItem>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* 자식 필드 렌더링 (객체 또는 배열인 경우) */}
      {isExpanded && (field.type === 'object' || field.type === 'array') && field.children && (
        <div className="ml-6 mt-4 border-l-2 pl-4 border-gray-200">
          {field.children.map((childField, index) => (
            <SchemaFieldComponent
              key={`${pathString}.${index}`}
              field={childField}
              path={[...path, index.toString()]}
              expandedFields={expandedFields}
              onToggleExpand={onToggleExpand}
              onUpdateField={onUpdateField}
              onAddField={onAddField}
              onRemoveField={onRemoveField}
            />
          ))}
        </div>
      )}
    </div>
  );
} 