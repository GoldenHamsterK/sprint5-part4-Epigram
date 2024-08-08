import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { SignInRequestType } from '@/schema/auth';
import { signIn } from '@/apis/auth';
import classNames from 'classnames/bind';
import styles from './signInForm.module.scss';
import { useSignInError } from './hooks/useSignInError';

const cx = classNames.bind(styles);

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<SignInRequestType>();
  const router = useRouter();
  const { emailError, passwordError, setError, resetError } = useSignInError();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      resetForm();
      resetError();
      router.push('/epigrams');
    },
    onError: setError,
  });

  const onSubmit = (data: SignInRequestType) => {
    mutation.mutate(data);
  };

  return (
    <div className={cx('signin-form-wrap')}>
      <form className={cx('signin-form')} onSubmit={handleSubmit(onSubmit)} noValidate>
        <img className={cx('logo')} alt='logo' src='/images/logo.svg' />
        <div className={cx('signin-input-wrap')}>
          <label htmlFor='email'>
            <input
              type='text'
              placeholder='이메일'
              className={cx('input', { 'input-error': errors.email || emailError })}
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            {emailError && <div className={cx('error-message')}>{emailError}</div>}
            {errors.email && <div className={cx('error-message')}>{errors.email.message}</div>}
          </label>

          <label htmlFor='password'>
            <input
              type='password'
              placeholder='비밀번호'
              className={cx('input', { 'input-error': errors.password || passwordError })}
              {...register('password', { required: '비밀번호는 필수 입력입니다.' })}
            />
            {errors.password && <div className={cx('error-message')}>{errors.password.message}</div>}
            {passwordError && <div className={cx('error-message')}>{passwordError}</div>}
          </label>
        </div>

        <button className={cx('button', 'button-lx')} type='submit'>
          로그인
        </button>
      </form>

      <div className={cx('signup-link')}>
        회원이 아니신가요?
        <button
          onClick={() => {
            router.push('/signup');
          }}
          type='button'
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
