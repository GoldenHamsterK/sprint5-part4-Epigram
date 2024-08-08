import classNames from 'classnames/bind';
import EmotionLog from '@/components/common/emotionLog/emotionLog';
import styles from './myPage.module.scss';
import Profile from './profile/profile';
import Calendar from './calendar/calendar';
import MyEpigram from './myEpigram/myEpigram';

const cx = classNames.bind(styles);

function Mypage() {
  return (
    <main>
      <Profile />
      <h2 className={cx('title')}>오늘의 감정</h2>
      <EmotionLog />
      {/* <Calendar /> */}
      <h2 className={cx('title')}>내 에피그램</h2>
      <MyEpigram />
    </main>
  );
}

export default Mypage;
