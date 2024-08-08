import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { SignUpRequestType } from '@/schema/auth';
import { signUp } from '@/apis/auth';
import classNames from 'classnames/bind';
import styles from './signUp.module.scss';
import { useSignUpError } from './hooks/useSignUpError';

const cx = classNames.bind(styles);

function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    watch,
  } = useForm<SignUpRequestType>();
  const router = useRouter();
  const { emailError, setError, resetError } = useSignUpError();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      window.alert('가입이 완료되었습니다.');
      localStorage.setItem('token', data.accessToken); // 토큰 저장
      resetForm();
      resetError();
      router.push('/epigrams');
    },
    onError: setError,
  });

  const onSubmit = (data: SignUpRequestType) => {
    mutation.mutate(data);
  };

  return (
    <div className={cx('signup-form-wrap')}>
      <form className={cx('signup-form')} onSubmit={handleSubmit(onSubmit)}>
        <img className={cx('logo')} alt='logo' src='/images/logo.svg' />
        <div className={cx('signup-input-wrap')}>
          <label htmlFor='email'>
            이메일
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
            비밀번호
            <input
              type='password'
              placeholder='비밀번호'
              className={cx('input', { 'input-error': errors.password })}
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
              })}
            />
            {errors.password && <div className={cx('error-message')}>{errors.password.message}</div>}
          </label>

          <label htmlFor='passwordConfirmation'>
            <input
              type='password'
              placeholder='비밀번호 확인'
              className={cx('input', { 'input-error': errors.passwordConfirmation })}
              {...register('passwordConfirmation', {
                required: '비밀번호 확인은 필수 입력입니다.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordConfirmation && <div className={cx('error-message')}>{errors.passwordConfirmation.message}</div>}
          </label>

          <label htmlFor='nickname'>
            닉네임
            <input
              type='text'
              placeholder='닉네임'
              className={cx('input', { 'input-error': errors.nickname })}
              {...register('nickname', {
                required: '닉네임은 필수 입력입니다.',
                maxLength: {
                  value: 10,
                  message: '10자 이하로 작성해주세요.',
                },
              })}
            />
            {errors.nickname && <div className={cx('error-message')}>{errors.nickname.message}</div>}
          </label>
        </div>

        <button type='submit' className={cx('button', 'button-lx')}>
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
