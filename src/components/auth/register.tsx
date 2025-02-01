'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';

async function registerUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const name = formData.get('name') as string;

  if (password !== confirmPassword) {
    return { error: '비밀번호가 일치하지 않습니다.' };
  }

  if (password.length < 8) {
    return { error: '비밀번호는 8자 이상이어야 합니다.' };
  }

  try {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (!response.ok) {
      return { error: '회원가입에 실패했습니다.' };
    }

    return { success: true };
  } catch (error) {
    return { error: '서버 오류가 발생했습니다.' };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? '가입 중...' : '회원가입'}
    </Button>
  );
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction] = useFormState(registerUser, null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">회원가입</h1>
                <p className="text-balance text-muted-foreground">
                  계정을 생성하여 시작하세요
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" name="name" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  최소 8자 이상 입력해주세요
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {!passwordMatch && confirmPassword && (
                  <p className="text-xs text-destructive">
                    비밀번호가 일치하지 않습니다
                  </p>
                )}
              </div>
              {state?.error && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
              <SubmitButton />
              <div className="text-center text-sm">
                이미 계정이 있으신가요?{' '}
                <a href="/login" className="underline underline-offset-4">
                  로그인
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        가입하기 버튼을 클릭하면 <a href="#">이용약관</a>과{' '}
        <a href="#">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
      </div>
    </div>
  );
}
