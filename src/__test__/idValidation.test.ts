// idValidation.test.ts

import { idValidation } from '../utils/idValidation';

describe('아이디 문자열 조합 검사', () => {
  test('알파벳 소문자로만 구성된 아이디가 3자 이상, 20자 이하인 경우 유효함을 반환하는지 확인', () => {
    expect(idValidation('abcdefghij')).toBe(true);
  });

  test('알파벳 소문자로만 구성된 아이디가 3자 이상, 20자 이하인 경우 유효함을 반환하는지 확인', () => {
    expect(idValidation('abcdefghij')).toBe(true);
  });

  test('알파벳 대문자로만 구성된 아이디가 3자 이상, 20자 이하인 경우 유효함을 반환하는지 확인', () => {
    expect(idValidation('ABCDEFGHIJ')).toBe(true);
  });

  test('알파벳 대소문자로 구성된 아이디가 3자 이상, 20자 이하인 경우 유효함을 반환하는지 확인', () => {
    expect(idValidation('ABCdefGHIJ')).toBe(true);
  });

  test('알파벳과 숫자로 구성된 아이디가 3자 이상, 20자 이하인 경우 유효함을 반환하는지 확인', () => {
    expect(idValidation('abc123def456')).toBe(true);
  });
});
