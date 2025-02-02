import { GetLayoutByPathQuery } from "@/lib/graphql/__generated__/graphql";
import React from "react";

export const SectionHeader = ({
  header,
}: {
  header: GetLayoutByPathQuery["layoutByPath"]["sections"][number];
}) => {
  return <header className="bg-gray-100 p-4">{header.name}</header>;
};
