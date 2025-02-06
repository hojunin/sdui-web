import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Widget } from "@/lib/graphql/__generated__/graphql";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface Props {
  widget: Widget;
}

export const BreadcrumbWidget = ({ widget }: Props) => {
  const breadcrumbs = widget.props?.breadcrumbs;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <Fragment key={item.label}>
            <BreadcrumbItem className="hidden md:block">
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
