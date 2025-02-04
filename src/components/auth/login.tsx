"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/lib/auth";
import { useFormState } from "react-dom";

async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { error: "로그인에 실패했습니다." };
    }

    const { accessToken, name, email: verifiedEmail } = await response.json();

    // 로그인 성공 시 사용자 정보와 토큰을 쿠키에 저장
    setUser(
      {
        email: verifiedEmail,
        name: name,
      },
      accessToken
    );

    // 대시보드로 리다이렉트
    window.location.href = "/dashboard";

    return { success: true };
  } catch (error) {
    return { error: "서버 오류가 발생했습니다." };
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useFormState(loginUser, null);

  return (
    <div className={cn("flex flex-col gap-6 w-1/3", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent>
          <form action={formAction} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {state?.error && (
                <div className="text-red-500 text-sm">{state.error}</div>
              )}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">SDUI Admin</h1>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                로그인
              </Button>
              <div className="text-center text-sm">
                <a
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  회원가입
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
