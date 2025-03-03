"use client";

import { GET_FORM_VALIDATION_SCHEMA, CREATE_FORM_VALIDATION_SCHEMA } from "@/lib/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DELETE_FORM_VALIDATION_SCHEMA } from "@/lib/graphql/queries";
import { useState, useEffect } from "react";
import { SchemaDetail, SchemaEditor, SchemaViewer, JsonSchema } from "@/components/admin/schema";
import { toast } from "@/hooks/use-toast";

export default function SchemaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"config" | "schema">("schema");
  
  const { data, loading, error } = useQuery(GET_FORM_VALIDATION_SCHEMA, {
    variables: { id },
  });

  const [deleteSchema, { loading: deleteLoading }] = useMutation(DELETE_FORM_VALIDATION_SCHEMA, {
    variables: { id },
    onCompleted: () => {
      router.push('/admin/schema');
    },
  });

  const [createSchema, { loading: createLoading }] = useMutation(CREATE_FORM_VALIDATION_SCHEMA, {
    onCompleted: (data) => {
      toast({
        title: "스키마가 업데이트되었습니다.",
        description: "스키마 설정을 확인해주세요.",
      });
      router.push(`/admin/schema/${data.createFormValidationSchema.id}`);
    },
    onError: (error) => {
      toast({
        title: "스키마 업데이트 실패",
        description: error.message,
      });
    }
  });

  // URL 쿼리 파라미터에서 탭 정보 가져오기
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (tab === 'config') {
      setActiveTab('config');
    }
  }, []);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (tab: "config" | "schema") => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };

  // 스키마 저장 핸들러
  const handleSaveSchema = (zodSchema: JsonSchema, formConfig: Record<string, unknown>) => {
    if (!data?.formValidationSchema) return;
    
    createSchema({
      variables: {
        input: {
          name: data.formValidationSchema.name,
          description: data.formValidationSchema.description,
          zodSchema,
          formConfig,
          isActive: data.formValidationSchema.isActive,
          isPublished: data.formValidationSchema.isPublished
        }
      }
    });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  const schema = data?.formValidationSchema;
  if (!schema) return <div>스키마를 찾을 수 없습니다.</div>;

  const handleDelete = () => {
    if (confirm("정말로 이 스키마를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      deleteSchema();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{schema.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/schema')}>
            목록으로
          </Button>
          <Button variant="destructive" disabled={deleteLoading} onClick={handleDelete}>
            {deleteLoading ? '삭제 중...' : '삭제'}
          </Button>
        </div>
      </div>

      <SchemaDetail schema={schema} />

      <div className="mt-6">
        <div className="flex border-b mb-4">
          <button 
            className={`px-4 py-2 border-b-2 ${activeTab === 'schema' ? 'border-primary font-medium' : 'border-transparent text-muted-foreground'}`}
            onClick={() => handleTabChange('schema')}
          >
            스키마
          </button>
          <button 
            className={`px-4 py-2 border-b-2 ${activeTab === 'config' ? 'border-primary font-medium' : 'border-transparent text-muted-foreground'}`}
            onClick={() => handleTabChange('config')}
          >
            폼 설정
          </button>
        </div>
        
        {activeTab === 'schema' && (
          <SchemaViewer zodSchema={schema.zodSchema} />
        )}
        
        {activeTab === 'config' && (
          <SchemaEditor 
            zodSchema={schema.zodSchema} 
            formConfig={schema.formConfig}
            onSave={handleSaveSchema}
            isLoading={createLoading}
          />
        )}
      </div>
    </div>
  );
} 