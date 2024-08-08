import React, { useState } from 'react';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import type { EpigramsLikeRequestType, EpigramsLikeResponseType, DeleteEpigramsLikeRequestType, DeleteEpigramsLikeResponseType } from '@/schema/epigram';
import { epigramsLike, deleteEpigramsLike } from '@/apis/epigram';
import classNames from 'classnames/bind';
import styles from './likeCount.module.scss';

const cx = classNames.bind(styles);

interface LikeCountProps {
  id: number;
  likeCount: number;
  isLiked: boolean;
}

const LikeCount: React.FC<LikeCountProps> = ({ id, likeCount, isLiked }) => {
  const [isLik, setIsLik] = useState<boolean>(isLiked);
  const [mylikeCount, setMyLikeCount] = useState<number>(likeCount);

  const deleteMutation: UseMutationResult<DeleteEpigramsLikeResponseType, Error, DeleteEpigramsLikeRequestType> = useMutation({
    mutationFn: deleteEpigramsLike,
    onSuccess: (data) => {
      setIsLik(false);
      setMyLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
    },
    onError: (error) => {
      setIsLik(false);
      setMyLikeCount((prev) => (prev !== undefined ? prev + 1 : 1));
    },
  });

  const mutation: UseMutationResult<EpigramsLikeResponseType, Error, EpigramsLikeRequestType> = useMutation({
    mutationFn: epigramsLike,
    onSuccess: (data) => {
      setIsLik(true);
      setMyLikeCount((prev) => (prev !== undefined ? prev + 1 : 1));
    },
    onError: (error) => {
      setIsLik(true);
      setMyLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
    },
  });

  const handleClick = () => {
    const requestData = { id };
    if (isLik) {
      deleteMutation.mutate(requestData);
    } else {
      mutation.mutate(requestData);
    }
  };

  return (
    <button className={cx('like-btn')} onClick={handleClick}>
      <img className={cx('ic-like')} alt='iconLike' src='/ic/like.svg' />
      {mylikeCount}
    </button>
  );
};

export default LikeCount;
