"use client";

import { SectionRenderer } from "@/components/common/layout-sections/section-renderer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { GET_LAYOUT_HISTORY, GET_MENUS } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";

const LayoutAdminPage = () => {
  const { data: menusData } = useQuery(GET_MENUS);
  const paths = menusData?.menus.reduce((acc, menu) => {
    acc.push(menu.path);
    if (menu.children) {
      acc.push(...menu.children.map((child) => child.path));
    }
    return acc;
  }, [] as string[]);
  const [selectedPath, setSelectedPath] = useState<string | null>(
    paths?.[0] ?? null
  );
  const [selectedRevision, setSelectedRevision] = useState<string | null>(null);
  const { data, loading, error } = useQuery(GET_LAYOUT_HISTORY, {
    variables: {
      path: selectedPath ?? "/",
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">레이아웃 히스토리</h1>

      <Separator />

      <div className="flex gap-4 mt-4">
        <div className="flex gap-2 items-center">
          <Label className="whitespace-nowrap">페이지 레이아웃 선택</Label>
          <Select
            value={selectedPath ?? undefined}
            onValueChange={(value) => setSelectedPath(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="레이아웃 선택" />
            </SelectTrigger>
            <SelectContent>
              {paths?.map((path, index) => (
                <SelectItem key={`${path}-${index}`} value={path}>
                  {path}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <Label className="whitespace-nowrap">버전 선택</Label>
          <Select
            value={
              selectedRevision ?? data?.layoutHistory[0]?.revision.toString()
            }
            onValueChange={(value) => setSelectedRevision(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="버전 선택" />
            </SelectTrigger>
            <SelectContent>
              {data?.layoutHistory.map((item) => (
                <SelectItem key={item.id} value={item.revision.toString()}>
                  {item.revision}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-10 p-4 border border-gray-200 rounded-md">
        {data?.layoutHistory
          .find((item) => item.revision === Number(selectedRevision))
          ?.sections.map((section) => (
            // TODO: revision 단위 확인 및 수정 모듈로 변경 필요
            <SectionRenderer key={section.name} section={section} />
          ))}
      </div>
    </div>
  );
};

export default LayoutAdminPage;
