"use client";

import { GET_FORM_VALIDATION_SCHEMAS } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function SchemaPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>스키마 관리</CardTitle>
          <CardDescription>
            폼 검증 스키마 목록을 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SchemaList />
        </CardContent>
      </Card>
    </div>
  );
}

function SchemaList() {
  const { data, loading, error } = useQuery(GET_FORM_VALIDATION_SCHEMAS);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  const schemas = data?.formValidationSchemas || [];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href="/admin/schema/create">새 스키마 생성</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>설명</TableHead>
            <TableHead>리비전</TableHead>
            <TableHead>활성화</TableHead>
            <TableHead>게시됨</TableHead>
            <TableHead>생성일</TableHead>
            <TableHead>수정일</TableHead>
            <TableHead>액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schemas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                스키마가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            schemas.map((schema) => (
              <TableRow key={schema.id}>
                <TableCell>{schema.name}</TableCell>
                <TableCell>{schema.description}</TableCell>
                <TableCell>{schema.revision}</TableCell>
                <TableCell>{schema.isActive ? "예" : "아니오"}</TableCell>
                <TableCell>{schema.isPublished ? "예" : "아니오"}</TableCell>
                <TableCell>{formatDate(schema.createdAt)}</TableCell>
                <TableCell>{formatDate(schema.updatedAt)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/schema/${schema.id}`}>상세보기</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 