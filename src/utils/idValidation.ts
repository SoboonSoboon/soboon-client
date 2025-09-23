export const idValidation = (id: string) => {
  const idRegex = /^[a-zA-Z0-9]{3,20}$/;

  if (!idRegex.test(id)) {
    throw new Error(
      '아이디는 3자 이상, 20자 이하의 영문과 숫자만 사용할 수 있습니다.',
    );
  }

  return true;
};
