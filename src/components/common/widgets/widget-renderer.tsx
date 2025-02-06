import { Widget } from "@/lib/graphql/__generated__/graphql";
import React from "react";
import { ButtonWidget } from "./button-widget/button-widget";
import { BreadcrumbWidget } from "./breadcrumb-widget/breadcrumb-widget";
import { DataTableWidget } from "./data-table-widget/data-table-widget";

interface Props {
  widget: Widget;
}

export const WidgetRenderer = ({ widget }: Props) => {
  switch (widget.type) {
    case "BUTTON":
      return <ButtonWidget widget={widget} />;
    case "BREADCRUMB":
      return <BreadcrumbWidget widget={widget} />;
    case "DATA_TABLE":
      return <DataTableWidget widget={widget} />;
    default:
      return null;
  }
};
