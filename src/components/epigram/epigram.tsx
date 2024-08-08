import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import router from 'next/router';
import classNames from 'classnames/bind';
import EmotionLog from '@/components/common/emotionLog/emotionLog';
import styles from './epigram.module.scss';
import TodayEpigram from './todayEpigram/todayEpigram';
import EpigramList from './epigramList/epigramList';

const cx = classNames.bind(styles);

function Epigram() {
  return (
    <main className={cx('epigram-wrap')}>
      <h2 className={cx('title')}>오늘의 에피그램</h2>
      <TodayEpigram />
      <h2 className={cx('title')}>오늘의 감정은 어떠신가요?</h2>
      <EmotionLog />
      <h2 className={cx('title')}>최신 에피그램</h2>
      <EpigramList />
      <button className={cx('new-epigram-btn')} onClick={() => router.push('/addepigram')}>
        + 에피그램 작성하기
      </button>
    </main>
  );
}

export default Epigram;
