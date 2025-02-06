import { GetLayoutByPathQuery } from "@/lib/graphql/__generated__/graphql";
import React from "react";
import { WidgetRenderer } from "@/components/common/widgets/widget-renderer";

export const SectionHeader = ({
  header,
}: {
  header: GetLayoutByPathQuery["layoutByPath"]["sections"][number];
}) => {
  return (
    <header>
      {header.widgets?.map((widget) => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </header>
  );
};
