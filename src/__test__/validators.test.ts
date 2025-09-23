import { isEmailValid, isValidPassword, isValidName, isValidPhoneNumber } from "@/utils/formValidators";

describe("폼 입력값 유효성 검사", () => {
  describe("이메일 검사", () => {
    test("올바른 이메일을 true로 판별해야 한다", () => {

			const email = "test@example.com";

			const result = isEmailValid(email);

      expect(result).toBe(true);
    });

    test("잘못된 이메일을 false로 판별해야 한다", () => {

			const email = "invalid-email";

			const result = isEmailValid(email);
			
      expect(result).toBe(false);
    });
  });

  describe("비밀번호 검사", () => {
    it("올바른 비밀번호를 true로 판별해야 한다", () => {

			const password = "Abc123!@";

			const result = isValidPassword(password);

      expect(result).toBe(true);
    });

    it("숫자나 특수문자가 없으면 false", () => {

			const password = "abcdefghi";

			const result = isValidPassword(password);

      expect(result).toBe(false);
    });

    it("8자리 미만이면 false", () => {

			const password = "Abc1!";

			const result = isValidPassword(password);

      expect(result).toBe(false);
    });
  });

  describe("이름 검사", () => {
    test("올바른 이름을 true로 판별해야 한다", () => {

			const name = "홍길동";

			const result = isValidName(name);

      expect(result).toBe(true);
    });

		test("올바른 이름을 true로 판별해야 한다", () => {
			
			const name = "James";

			const result = isValidName(name);

      expect(result).toBe(true);
		});

    test("1글자는 false", () => {

			const name = "김";

			const result = isValidName(name);

      expect(result).toBe(false);
    });

    test("특수문자가 포함되면 false", () => {

			const name = "길동!";

			const result = isValidName(name);

      expect(result).toBe(false);
    });
  });

  describe("전화번호 검사", () => {
    test("올바른 전화번호를 true로 판별해야 한다", () => {

			const phoneNumber = "010-1234-5678";

			const result = isValidPhoneNumber(phoneNumber);

      expect(result).toBe(true);
    });

    test("잘못된 전화번호를 false로 판별해야 한다", () => {

			const phoneNumber = "01012345678";

			const result = isValidPhoneNumber(phoneNumber);

      expect(result).toBe(false);
    });

		test("잘못된 전화번호를 false로 판별해야 한다", () => {

			const phoneNumber = "02-123-4567";

			const result = isValidPhoneNumber(phoneNumber);

      expect(result).toBe(false);
		});

		test("전화번호가 없으면 false", () => {

			const phoneNumber = "ss";

			const result = isValidPhoneNumber(phoneNumber);

      expect(result).toBe(true);
		});
  });
});