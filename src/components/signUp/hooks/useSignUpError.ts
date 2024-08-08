import { useState } from 'react';
import { SignUpError } from '../model/singnUpType';

export const useSignUpError = () => {
  const [emailError, setEmailError] = useState<string | null>(null);

  const setError = (error: SignUpError) => {
    const details = error.response?.data?.details;

    resetError();

    if (details.hasOwnProperty('email')) {
      return setEmailError('이미 사용중인 이메일입니다');
    }
    setEmailError('회원가입 중 오류가 발생했습니다.');
  };

  const resetError = () => {
    setEmailError(null);
  };

  return { emailError, setError, resetError };
};
