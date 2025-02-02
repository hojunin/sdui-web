import {
  GetLayoutByPathQuery,
  LayoutSectionType,
} from "@/lib/graphql/__generated__/graphql";
import Section from "@/components/common/layout-sections/section";
import { SectionHeader } from "./section-header";
import { SectionFooter } from "./section-footer";

export const SectionRenderer = ({
  section,
}: {
  section: GetLayoutByPathQuery["layoutByPath"]["sections"][number];
}) => {
  switch (section.type) {
    case LayoutSectionType.Header:
      return <SectionHeader key={section.name} header={section} />;
    case LayoutSectionType.Section:
      return <Section key={section.name} section={section} />;
    case LayoutSectionType.Footer:
      return <SectionFooter key={section.name} footer={section} />;
    default:
      // TODO: 정의된 섹션이 아니면 커스텀 컴포넌트 or null 반환
      return null;
  }
};
