type User = {
  email: string;
  name: string;
};

// 쿠키 관련 유틸리티 함수들
function setCookie(name: string, value: string, days: number) {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
  document.cookie = `${name}=${value}; path=/; max-age=${
    60 * 60 * 24 * days
  }; ${secure} SameSite=Strict`;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

// 사용자 관련 함수들
export function getUser(): User | null {
  const token = getCookie('token');
  const userStr = getCookie('user');

  if (!token || !userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function setUser(user: User, token: string) {
  setCookie('token', token, 7); // 7일 동안 유효
  setCookie('user', JSON.stringify(user), 7);
}

export function removeUser() {
  removeCookie('token');
  removeCookie('user');
}

export function isAuthenticated(): boolean {
  return !!getCookie('token');
}

// API 요청을 위한 헤더 생성 함수
export function getAuthHeaders(): HeadersInit {
  const token = getCookie('token');
  return token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };
}
