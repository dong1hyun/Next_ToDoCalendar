export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/);
export const EMAIL_REGEX = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export const PASSWORD_REGEX_ERROR = "비밀번호는 최소 하나 이상의 대문자, 소문자, 숫자, 특수문자(#?!@$%^&*-)를 포함해야 합니다.";

export const INVALID_EMAIL_ERROR = "유효한 이메일 형식이 아닙니다.";
export const EXIST_EMAIL_ERROR = "동일한 이메일로 생성된 계정이 이미 존재합니다."


export const USERNAME_MIN_LENGTH_ERROR = "사용자명은 최소 3자 이상이어야 합니다."
export const USERNAME_MAX_LENGTH_ERROR = "사용자명은 최대 10자까지만만 등록 가능합니다."

export const EMAIL_ERROR = "올바른 이메일을 입력해주세요."

export const PASSWORD_MIN_LENGH_ERROR = "비밀번호는 최소 4자 이상이어야 합니다."
export const PASSWORD_MAX_LENGH_ERROR = "비밀번호는 최소 10자까지만 등록 가능합니다."
export const DIFFENT_PASSWORD_ERROR = "비밀번호가 다릅니다."

export const WRONG_INPUT_ERROR = "잘못된 이메일 혹은 비밀번호입니다.";