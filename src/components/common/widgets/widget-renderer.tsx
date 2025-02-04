import { Widget } from "@/lib/graphql/__generated__/graphql";
import React from "react";
import { ButtonWidget } from "./button-widget";

interface Props {
  widget: Widget;
}

export const WidgetRenderer = ({ widget }: Props) => {
  switch (widget.type) {
    case "BUTTON":
      return <ButtonWidget widget={widget} />;
    default:
      return null;
  }
};
