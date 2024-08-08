import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

interface MyComponentProps {
  leftContents?: React.ReactNode;
  rightContents?: React.ReactNode;
}

const Header: React.FC<MyComponentProps> = ({ leftContents, rightContents }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>();

  return (
    <header className={cx('header-wrap')}>
      {leftContents || <div className={cx('no-contents')} />}
      <img className={cx('logo')} alt='logo' src='/images/logo.svg' />
      {rightContents || <div className={cx('no-contents')} />}
    </header>
  );
};

export default Header;
