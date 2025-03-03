"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface SchemaDetailProps {
  schema: {
    id: string;
    name: string;
    description: string;
    revision: number;
    isActive: boolean;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export function SchemaDetail({ schema }: SchemaDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>스키마 정보</CardTitle>
        <CardDescription>{schema.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">ID</p>
            <p className="text-sm text-muted-foreground">{schema.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium">리비전</p>
            <p className="text-sm text-muted-foreground">{schema.revision}</p>
          </div>
          <div>
            <p className="text-sm font-medium">상태</p>
            <div className="flex gap-2 mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${schema.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {schema.isActive ? "활성화" : "비활성화"}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${schema.isPublished ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                {schema.isPublished ? "게시됨" : "미게시"}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">생성일</p>
            <p className="text-sm text-muted-foreground">{formatDate(schema.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">수정일</p>
            <p className="text-sm text-muted-foreground">{formatDate(schema.updatedAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 