export function isEmailValid(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

// 비밀번호 유효성 검사 (8자 이상, 숫자/문자/특수문자 포함)
export function isValidPassword(password: string): boolean {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

// 이름 유효성 검사 (한글/영문, 2~20자)
export function isValidName(name: string): boolean {
  const regex = /^[가-힣a-zA-Z]{2,20}$/;
  return regex.test(name.trim());
}

// 전화번호 유효성 검사 (010-1234-5678 형태)
export function isValidPhoneNumber(phone: string): boolean {
  const regex = /^01[016789]-\d{3,4}-\d{4}$/;
  return regex.test(phone.trim());
}