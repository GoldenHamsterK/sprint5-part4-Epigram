import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { epigrams } from '@/apis/epigram';
import type { EpigramsRequestType } from '@/schema/epigram';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './addEpigramForm.module.scss';

const cx = classNames.bind(styles);

// 분리하기
enum Author {
  CUSTOM = 'CUSTOM',
  UNKNOWN = 'UNKNOWN',
  PERSONAL = 'PERSONAL',
}
// 분리하기
const authorItems = new Map<Author, string>([
  [Author.CUSTOM, '직접 입력'],
  [Author.UNKNOWN, '알 수 없음'],
  [Author.PERSONAL, '본인'],
]);

function EpigramForm() {
  const router = useRouter();
  const [authorChoice, setAuthorChoice] = useState<Author>(Author.CUSTOM);
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EpigramsRequestType>({
    defaultValues: {
      tags: [],
    },
  });

  const mutation = useMutation({
    mutationFn: epigrams,
    onSuccess: (data) => {
      window.alert('에피그램 작성이 완료되었습니다.');
      reset();
      router.push(`/epigrams/${data.id}`);
    },
    onError: () => {
      console.log(errors);
    },
  });

  const onSubmit = (data: EpigramsRequestType) => {
    console.log(data);
    mutation.mutate(data);
  };

  // 라디오버튼 선택
  const handleAuthorChange = (author: Author) => {
    setAuthorChoice(author);

    let inputValue;
    if (author === Author.CUSTOM) {
      inputValue = '';
    } else {
      inputValue = authorItems.get(author) || '';
    }

    setValue('author', inputValue);
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim().length > 0) {
      submitTagItem();
      e.preventDefault();
    }
  };

  // 태그 추가
  const submitTagItem = () => {
    if (tagItem.trim() === '') return; // 빈 태그 추가 방지
    setTagList((prevTags) => {
      const currentTags = [...prevTags, tagItem];
      setValue('tags', currentTags);
      return currentTags;
    });
    setTagItem('');
  };

  // 태그 삭제
  const deleteTagItem = (tagToDelete: any) => {
    setTagList((prevTags) => {
      const currentTags = prevTags.filter((tag) => tag !== tagToDelete);
      setValue('tags', currentTags);
      return currentTags;
    });
  };

  return (
    <section>
      <form className={cx('')} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='content'>
          내용
          <input
            type='text'
            placeholder='500자 이내로 입력해주세요'
            className={cx('input', { 'input-error': errors.content })}
            {...register('content', {
              required: '내용은 필수 입력입니다.',
              maxLength: {
                value: 500,
                message: '내용은 500자 이내로 제한됩니다.',
              },
            })}
          />
          {errors.content && <div className={cx('error-message')}>{errors.content.message}</div>}
        </label>

        <label htmlFor='author'>
          저자
          <div>
            {Array.from(authorItems).map(([key, value]) => (
              <label key={key}>
                <input type='radio' name='authorChoice' value={key} onChange={() => handleAuthorChange(key)} defaultChecked={key === Author.CUSTOM} />
                {value}
              </label>
            ))}
          </div>
          <label>
            <input
              type='text'
              placeholder='저자 이름 입력'
              className={cx('input')}
              {...register('author', { required: authorChoice === Author.CUSTOM && '저자는 필수 입력입니다.' })}
              disabled={authorChoice !== Author.CUSTOM}
            />
          </label>
        </label>

        <label htmlFor='reference'>
          출처
          <input
            type='text'
            placeholder='출처 제목 입력'
            className={cx('input')}
            {...register('referenceTitle', {
              setValueAs: (v) => v || undefined,
            })}
          />
          <input
            type='text'
            placeholder='URL (ex. https://www.website.com)'
            className={cx('input')}
            {...register('referenceUrl', {
              setValueAs: (v) => v || undefined,
            })}
          />
        </label>

        <label>
          태그
          <input type='text' placeholder='최대 3개(한 태그당 최대10자)' value={tagItem} onChange={(e) => setTagItem(e.target.value)} onKeyDown={onKeyPress} className={cx('input')} />
          {tagList.map((tagItem, index) => (
            <div key={index} className={cx('tag')}>
              <div>{tagItem}</div>
              <button className={cx('tag-delete')} type='button' onClick={() => deleteTagItem(tagItem)}>
                X
              </button>
            </div>
          ))}
        </label>

        <button type='submit' className={cx('button', 'button-lx')}>
          저장
        </button>
      </form>
    </section>
  );
}

export default EpigramForm;
