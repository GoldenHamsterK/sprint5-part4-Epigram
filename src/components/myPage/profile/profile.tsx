import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { GetUserReponseType } from '@/schema/user';
import { getMe } from '@/apis/user';
import router from 'next/router';
import styles from './profile.module.scss';

const cx = classNames.bind(styles);

const Profile: React.FC = () => {
  const { data, error, isLoading } = useQuery<GetUserReponseType>({
    queryKey: ['user'],
    queryFn: () => getMe(),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const { id, nickname, teamId, image } = data;
  const imageUrl = image || '/images/noprofile.svg';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountname');
    router.push('/');
  };

  return (
    <section className={cx('profile')}>
      <img className={cx('profile-image')} src={imageUrl} alt={`${nickname}'s profile image`} />
      {nickname}
      <button className={cx('lgout-btn')} onClick={handleLogout}>
        로그아웃
      </button>
    </section>
  );
};

export default Profile;
function setUserAccountname(arg0: null) {
  throw new Error('Function not implemented.');
}

function setUserToken(arg0: null) {
  throw new Error('Function not implemented.');
}

function setSelectedOption(arg0: string) {
  throw new Error('Function not implemented.');
}
