"use client";

import { GetLayoutByPathQuery } from "@/lib/graphql/__generated__/graphql";
import { cn } from "@/lib/utils";
import React, { forwardRef, useState } from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  section: GetLayoutByPathQuery["layoutByPath"]["sections"][number];
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className, section, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div
        className={cn("flex flex-col gap-4", className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-center justify-between w-full">
          <button
            className="flex justify-start w-full bg-gray-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h2 className="text-2xl font-semibold">{section.name}</h2>
          </button>
        </div>
        <div
          className={cn("flex flex-col gap-4", isExpanded ? "block" : "hidden")}
        >
          {section.type}
          {children}
        </div>
      </div>
    );
  }
);

Section.displayName = "Section";

export default Section;
