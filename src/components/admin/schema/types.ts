// 스키마 필드 타입 정의
export type FieldType = 'string' | 'number' | 'boolean' | 'select' | 'object' | 'array' | 'date';

// 문자열 검증 타입
export type StringValidationType = 
  | 'email' 
  | 'url' 
  | 'emoji' 
  | 'uuid' 
  | 'nanoid' 
  | 'cuid' 
  | 'cuid2' 
  | 'ulid' 
  | 'regex' 
  | 'includes' 
  | 'startsWith' 
  | 'endsWith' 
  | 'datetime' 
  | 'ip' 
  | 'cidr'
  | 'date'
  | 'time'
  | 'duration'
  | 'base64';

// 문자열 변환 타입
export type StringTransformType = 'trim' | 'toLowerCase' | 'toUpperCase';

// 숫자 검증 타입
export type NumberValidationType = 
  | 'int' 
  | 'positive' 
  | 'nonnegative' 
  | 'negative' 
  | 'nonpositive'
  | 'multipleOf'
  | 'finite'
  | 'safe';

// Zod 스키마 타입 정의
export interface ZodValidation {
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  regex?: { pattern: string; message: string };
}

export interface ZodTypeInfo {
  type: string;
  validation?: ZodValidation;
  values?: string[]; // enum 타입일 경우
  shape?: Record<string, ZodFieldInfo>; // object 타입일 경우
  items?: ZodTypeInfo; // array 타입일 경우
}

export interface ZodFieldInfo {
  type: ZodTypeInfo;
  optional?: boolean;
  description?: string;
}

// JSON 스키마 타입 (기존 구조)
export interface JsonSchema {
  type: string | ZodTypeInfo;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  required?: string[];
  enum?: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  [key: string]: unknown;
}

// 검증 규칙 인터페이스
export interface ValidationRule {
  type: string;
  value?: string | number | RegExp;
  message: string;
}

// 스키마 필드 인터페이스
export interface SchemaField {
  name: string;
  type: FieldType;
  required: boolean;
  children?: SchemaField[];
  options?: string[]; // select 타입일 경우 옵션
  validation?: {
    // 공통 검증 규칙
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    length?: number;
    pattern?: string;
    
    // 문자열 특수 검증
    stringValidations?: ValidationRule[];
    
    // 문자열 변환
    stringTransforms?: StringTransformType[];
    
    // 숫자 특수 검증
    numberValidations?: ValidationRule[];
    
    // 날짜 검증
    minDate?: string;
    maxDate?: string;
    
    // 커스텀 에러 메시지
    errorMessages?: {
      required?: string;
      min?: string;
      max?: string;
      minLength?: string;
      maxLength?: string;
      length?: string;
      pattern?: string;
      type?: string;
      minDate?: string;
      maxDate?: string;
      [key: string]: string | undefined;
    };
  };
} 