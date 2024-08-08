import { useState } from 'react';
import { SignInError } from '../model/singnInType';

export const useSignInError = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const setError = (error: SignInError) => {
    const details = error.response?.data?.details;

    resetError();

    if (!!details?.email || !!details?.requestBody?.email) {
      return setEmailError('존재하지 않는 이메일입니다.');
    }
    if (!!details?.password || !!details?.requestBody?.password) {
      return setPasswordError('비밀번호가 일치하지 않습니다.');
    }
    setPasswordError('로그인 중 오류가 발생했습니다.'); // 기본 오류 메시지 설정
  };

  const resetError = () => {
    setEmailError(null);
    setPasswordError(null);
  };

  return { emailError, passwordError, setError, resetError };
};
