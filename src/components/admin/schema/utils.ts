import { FieldType, JsonSchema, SchemaField, ZodTypeInfo, ZodFieldInfo } from './types';

// zodSchema와 formConfig를 분석하여 SchemaField[] 형태로 변환하는 함수
export const parseSchemaToFields = (zodSchema: JsonSchema, formConfig: Record<string, unknown>): SchemaField[] => {
  const fields: SchemaField[] = [];
  
  try {
    // API 응답 구조 처리: zodSchema.type이 객체인 경우 (중첩된 구조)
    if (typeof zodSchema.type === 'object' && zodSchema.type.type === 'object' && zodSchema.type.shape) {
      // shape 객체를 properties처럼 처리
      const typeInfo = zodSchema.type as ZodTypeInfo;
      const shape = typeInfo.shape || {};
      
      Object.entries(shape).forEach(([key, fieldInfo]) => {
        const fieldType = fieldInfo.type?.type || 'string';
        const isOptional = fieldInfo.optional === true;
        
        const field: SchemaField = {
          name: key,
          type: mapZodTypeToFieldType(fieldType),
          required: !isOptional,
        };
        
        // validation 정보 추가
        if (fieldInfo.type?.validation) {
          field.validation = {};
          
          // 문자열 유효성 검사
          if (fieldInfo.type.validation.min) {
            field.validation.min = fieldInfo.type.validation.min.value;
          }
          if (fieldInfo.type.validation.max) {
            field.validation.max = fieldInfo.type.validation.max.value;
          }
          
          // 정규식 패턴
          if (fieldInfo.type.validation.regex) {
            field.validation.pattern = fieldInfo.type.validation.regex.pattern;
          }
        }
        
        // select 타입인 경우 options 추가
        if (field.type === 'select' && fieldInfo.type?.values) {
          field.options = fieldInfo.type.values;
        }
        
        // 객체 타입인 경우 재귀적으로 처리
        if (field.type === 'object' && fieldInfo.type?.shape) {
          const configForKey = formConfig?.[key] as Record<string, unknown> || {};
          field.children = parseSchemaToFields({ type: fieldInfo.type }, configForKey);
        }
        
        fields.push(field);
      });
    } 
    // 기존 구조 처리: zodSchema.type이 문자열인 경우
    else if (typeof zodSchema.type === 'string' && zodSchema.type === 'object' && zodSchema.properties) {
      Object.entries(zodSchema.properties).forEach(([key, value]) => {
        const field: SchemaField = {
          name: key,
          type: getFieldType(value),
          required: zodSchema.required?.includes(key) || false,
        };
        
        // validation 정보 추가
        if (value.minLength || value.maxLength || value.pattern || value.minimum || value.maximum) {
          field.validation = {
            minLength: value.minLength,
            maxLength: value.maxLength,
            pattern: value.pattern,
            min: value.minimum,
            max: value.maximum,
          };
        }
        
        // select 타입인 경우 options 추가
        if (field.type === 'select' && value.enum) {
          field.options = value.enum;
        }
        
        // 객체 타입인 경우 재귀적으로 처리
        if (field.type === 'object' && value.properties) {
          const configForKey = formConfig?.[key] as Record<string, unknown> || {};
          field.children = parseSchemaToFields(value, configForKey);
        }
        
        // 배열 타입인 경우 items 처리
        if (field.type === 'array' && value.items) {
          const itemType = getFieldType(value.items);
          if (itemType === 'object' && value.items.properties) {
            field.children = parseSchemaToFields(value.items, {});
          }
        }
        
        fields.push(field);
      });
    }
  } catch (error) {
    console.error("스키마 파싱 중 오류 발생:", error);
  }
  
  return fields;
};

// Zod 타입을 필드 타입으로 매핑하는 함수
const mapZodTypeToFieldType = (zodType: string): FieldType => {
  if (!zodType) return 'string';
  
  switch (zodType) {
    case 'string':
      return 'string';
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'object':
      return 'object';
    case 'array':
      return 'array';
    case 'enum':
      return 'select';
    default:
      return 'string';
  }
};

// 필드 타입 결정 함수
export const getFieldType = (schema: JsonSchema): FieldType => {
  if (!schema || !schema.type) return 'string';
  
  // type이 객체인 경우 (API 응답 구조)
  if (typeof schema.type === 'object') {
    const typeInfo = schema.type;
    switch (typeInfo.type) {
      case 'string':
        return 'string';
      case 'number':
      case 'integer':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'object':
        return 'object';
      case 'array':
        return 'array';
      case 'enum':
        return 'select';
      default:
        return 'string';
    }
  }
  
  // type이 문자열인 경우 (기존 구조)
  switch (schema.type) {
    case 'string':
      return schema.enum ? 'select' : 'string';
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'object':
      return 'object';
    case 'array':
      return 'array';
    default:
      return 'string';
  }
};

// 스키마 필드를 zodSchema로 변환하는 함수
export const fieldsToZodSchema = (fields: SchemaField[]): JsonSchema => {
  // API 응답 구조에 맞게 변환
  const shape: Record<string, ZodFieldInfo> = {};
  
  fields.forEach(field => {
    // 기본 필드 정보
    const fieldInfo: ZodFieldInfo = {
      type: {
        type: mapFieldTypeToZodType(field.type),
      },
      optional: !field.required,
    };
    
    // validation 추가
    if (field.validation) {
      if (!fieldInfo.type.validation) {
        fieldInfo.type.validation = {};
      }
      
      if (field.type === 'string' || field.type === 'select') {
        if (field.validation.minLength !== undefined) {
          fieldInfo.type.validation.min = {
            value: field.validation.minLength,
            message: `최소 ${field.validation.minLength}자 이상 입력해주세요.`
          };
        }
        if (field.validation.maxLength !== undefined) {
          fieldInfo.type.validation.max = {
            value: field.validation.maxLength,
            message: `최대 ${field.validation.maxLength}자 이내로 입력해주세요.`
          };
        }
        if (field.validation.pattern !== undefined) {
          fieldInfo.type.validation.regex = {
            pattern: field.validation.pattern,
            message: `올바른 형식으로 입력해주세요.`
          };
        }
      } else if (field.type === 'number') {
        if (field.validation.min !== undefined) {
          fieldInfo.type.validation.min = {
            value: field.validation.min,
            message: `최소값은 ${field.validation.min}입니다.`
          };
        }
        if (field.validation.max !== undefined) {
          fieldInfo.type.validation.max = {
            value: field.validation.max,
            message: `최대값은 ${field.validation.max}입니다.`
          };
        }
      }
    }
    
    // select 옵션 추가
    if (field.type === 'select' && field.options) {
      fieldInfo.type.values = field.options;
    }
    
    // 객체 타입인 경우 재귀적으로 처리
    if (field.type === 'object' && field.children) {
      const result = fieldsToZodSchema(field.children);
      if (typeof result.type === 'object' && result.type.shape) {
        fieldInfo.type.shape = result.type.shape;
      }
    }
    
    // 배열 타입인 경우 items 처리
    if (field.type === 'array' && field.children) {
      const result = fieldsToZodSchema(field.children);
      if (typeof result.type === 'object' && result.type.shape) {
        fieldInfo.type.items = {
          type: 'object',
          shape: result.type.shape
        };
      }
    }
    
    shape[field.name] = fieldInfo;
  });
  
  return {
    type: {
      type: 'object',
      shape
    }
  };
};

// 필드 타입을 Zod 타입으로 변환하는 함수
const mapFieldTypeToZodType = (fieldType: FieldType): string => {
  switch (fieldType) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'select':
      return 'enum';
    case 'object':
      return 'object';
    case 'array':
      return 'array';
    default:
      return 'string';
  }
};

// 초기 확장 상태 설정 함수
export const getInitialExpandedState = (fields: SchemaField[]): Record<string, boolean> => {
  const expandedState: Record<string, boolean> = {};
  
  const setInitialExpandedState = (fields: SchemaField[], parentPath: string = '') => {
    fields.forEach((field, index) => {
      const path = parentPath ? `${parentPath}.${index}` : `${index}`;
      if (field.type === 'object' || field.type === 'array') {
        expandedState[path] = true;
        if (field.children && field.children.length > 0) {
          setInitialExpandedState(field.children, path);
        }
      }
    });
  };
  
  setInitialExpandedState(fields);
  return expandedState;
}; 