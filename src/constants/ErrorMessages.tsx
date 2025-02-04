export enum ErrorMessages {
    UNAUTHORIZED = '인증되지 않습니다.',
    FORBIDDEN = '권한이 없습니다.',
    NOT_FOUND = '요청한 리소스를 찾을 수 없습니다.',
    CONFLICT = '이미 존재하는 데이터입니다.',
    SERVER_ERROR = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    UNKNOWN_ERROR = '알 수 없는 오류가 발생했습니다.',
    BAD_REQUEST = '잘못된 요청입니다.',
    EMAIL_TAKEN = '이 이메일은 이미 사용 중입니다.',
    PASSWORD_MISMATCH = '비밀번호가 일치하지 않습니다.',
}
