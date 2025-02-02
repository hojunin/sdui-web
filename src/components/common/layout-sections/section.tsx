"use client";

import { GetLayoutByPathQuery } from "@/lib/graphql/__generated__/graphql";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
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
            className="flex justify-between w-full bg-gray-100 px-4 py-2 rounded-t-md items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h2 className="text-2xl font-semibold">{section.name}</h2>
            <ChevronDownIcon
              className={cn(
                "w-6 h-6 transition-all duration-300",
                isExpanded ? "rotate-180" : "rotate-0"
              )}
            />
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
