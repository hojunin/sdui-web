import {
  GetLayoutByPathQuery,
  LayoutSectionType,
} from "@/lib/graphql/__generated__/graphql";
import Section from "@/components/common/layout-sections/section";

export const SectionRenderer = ({
  section,
}: {
  section: GetLayoutByPathQuery["layoutByPath"]["sections"][number];
}) => {
  switch (section.type) {
    case LayoutSectionType.Section:
      return <Section key={section.name} section={section} />;
    default:
      return null;
  }
};
