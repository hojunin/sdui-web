import { Engine } from "json-rules-engine";

// 팩트 타입 정의
interface ButtonFacts {
  userRole: {
    role: string;
  };
  currentTime: {
    hours: string;
  };
}

// 이벤트 파라미터 타입 정의
interface ButtonEventParams {
  props: {
    variant: string;
    disabled: boolean;
  };
}

// 콜백 파라미터 타입 정의
interface CallbackParams {
  args: {
    newState: string;
    previousState: string;
  };
  name: string;
}

export class ButtonRuleEngine {
  private engine: Engine;

  constructor(rule?: any) {
    console.log("🚀 ~ ButtonRuleEngine ~ constructor ~ rule:", rule);
    this.engine = new Engine();
    if (rule) {
      this.setupRules(rule);
    }
  }

  private setupRules(rule: any) {
    this.engine.addRule(rule);
  }

  async evaluateRules(facts: ButtonFacts): Promise<{
    success: boolean;
    events: Array<{
      type: string;
      params: ButtonEventParams | CallbackParams;
    }>;
  }> {
    try {
      const results = await this.engine.run(facts);
      const events = results.events.map((event) => ({
        type: event.type,
        params: event.params,
      }));

      return {
        success: true,
        events,
      };
    } catch (error) {
      console.warn("Rule evaluation failed:", error);
      return {
        success: false,
        events: [],
      };
    }
  }

  // 현재 시간을 가져오는 헬퍼 메서드
  static getCurrentTimeString(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  // 규칙 평가를 위한 팩트 생성 메서드
  static createFacts(userRole: string): ButtonFacts {
    return {
      userRole: { role: userRole },
      currentTime: { hours: ButtonRuleEngine.getCurrentTimeString() },
    };
  }
}
