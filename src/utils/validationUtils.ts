function validateProjectName(name: string): string {
  const regex = /^[A-Za-z0-9가-힣]+$/;

  if (name.length < 2 || name.length > 20) {
    return "프로젝트 이름은 2자 이상, 20자 이내로 입력해주세요.";
  }

  if (!regex.test(name)) {
    return "영문자(대소문자), 숫자, 한글만 사용할 수 있습니다.";
  }

  return "";
}

export default validateProjectName;
