"use client";

import { SectionRenderer } from "@/components/common/layout-sections/section-renderer";
import { GET_LAYOUT_BY_PATH } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";

export default function SalesDashboard() {
  const { data, loading, error } = useQuery(GET_LAYOUT_BY_PATH, {
    variables: {
      path: "/dashboard/settlement",
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 w-full">
      {data?.layoutByPath.sections.map((section) => (
        <SectionRenderer key={section.name} section={section} />
      ))}
    </div>
  );
}
