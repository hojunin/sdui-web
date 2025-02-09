"use client";

import { SectionRenderer } from "@/components/common/layout-sections/section-renderer";
import { GET_LAYOUT_BY_PATH } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import React from "react";

const TemplatePage = () => {
  const { data, loading, error } = useQuery(GET_LAYOUT_BY_PATH, {
    variables: {
      path: "/users/list",
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.layoutByPath.sections.map((section) => (
        <SectionRenderer key={section.name} section={section} />
      ))}
    </div>
  );
};

export default TemplatePage;
