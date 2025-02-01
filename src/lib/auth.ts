type User = {
  email: string;
  name: string;
};

// 쿠키 관련 유틸리티 함수들
function setCookie(name: string, value: string, days: number) {
  const secure = process.env.NODE_ENV === "production" ? "Secure;" : "";
  const domain = window.location.hostname;
  document.cookie = `${name}=${value}; path=/; domain=${domain}; max-age=${
    60 * 60 * 24 * days
  }; ${secure} SameSite=Strict`;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function removeCookie(name: string) {
  const secure = process.env.NODE_ENV === "production" ? "Secure;" : "";
  const domain = window.location.hostname;
  // 모든 가능한 경로에서 쿠키 제거
  document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT; ${secure} SameSite=Strict`;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; ${secure} SameSite=Strict`;
}

// 사용자 관련 함수들
export function getUser(): User | null {
  const token = getCookie("token");
  const userStr = getCookie("user");

  if (!token || !userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function setUser(user: User, token: string) {
  // 설정하기 전에 먼저 기존 쿠키들을 제거
  removeUser();
  // 새로운 쿠키 설정
  setCookie("token", token, 7);
  setCookie("user", JSON.stringify(user), 7);
}

export function removeUser() {
  removeCookie("token");
  removeCookie("user");
}

export function isAuthenticated(): boolean {
  return !!getCookie("token");
}

// 토큰 관련 함수 추가
export function getToken(): string | null {
  return getCookie("token");
}
