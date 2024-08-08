import React, { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import styles from './shareBtn.module.scss';

const cx = classNames.bind(styles);

const ShareBtn: React.FC = () => {
  const router = useRouter();
  const currentUrl = `${window.location.origin}${router.asPath}`;

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('URL이 복사되었습니다!');
      })
      .catch(() => {
        alert('URL 복사에 실패했습니다.');
      });
  };

  return (
    <div>
      <button className={cx('share-btn')} onClick={handleCopyUrl}>
        <img className={cx('ic-share')} alt='iconshare' src='/ic/share.svg' />
      </button>
    </div>
  );
};

export default ShareBtn;
