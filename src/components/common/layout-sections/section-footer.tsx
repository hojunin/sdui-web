import { GetLayoutByPathQuery } from "@/lib/graphql/__generated__/graphql";
import React from "react";

export const SectionFooter = ({
  footer,
}: {
  footer: GetLayoutByPathQuery["layoutByPath"]["sections"][number];
}) => {
  return <footer className="bg-gray-100 p-4">{footer.name}</footer>;
};
