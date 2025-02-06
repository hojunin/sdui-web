import { Button } from "@/components/ui/button";
import { Widget } from "@/lib/graphql/__generated__/graphql";
import React, { forwardRef } from "react";
// import { ButtonRuleEngine } from "./button-widget.rule-engine";
// import { toast } from "@/hooks/use-toast";

interface ButtonWidgetProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  widget: Widget;
}

export const ButtonWidget = forwardRef<HTMLButtonElement, ButtonWidgetProps>(
  ({ widget, ...props }, ref) => {
    // const ruleEngine = new ButtonRuleEngine(widget.rules);

    const handleClick = async () => {
      //   const facts = ButtonRuleEngine.createFacts("SUPER_ADMIN");
      //   const result = await ruleEngine.evaluateRules(facts);
      //   if (!result.success) {
      //     return toast({
      //       title: "규칙 평가 실패",
      //       description: "버튼 클릭 규칙 평가에 실패했습니다.",
      //       variant: "destructive",
      //     });
      //   }
      //   executeButtonAction(result.events);
    };

    // const executeButtonAction = (events: any) => {
    //   events.forEach((event: any) => {
    //     if (event.type === "CHANGE_PROPS") {
    //       // 버튼 속성 업데이트
    //       const { props } = event.params;
    //       // props 적용 로직
    //     } else if (event.type === "CALLBACK") {
    //       const { args, name } = event.params;
    //       // 콜백 실행 로직
    //     }
    //   });
    // };

    return (
      <Button
        ref={ref}
        {...props}
        {...widget?.props}
        style={widget?.style}
        onClick={handleClick}
      >
        {widget?.props?.text}
      </Button>
    );
  }
);

ButtonWidget.displayName = "ButtonWidget";
