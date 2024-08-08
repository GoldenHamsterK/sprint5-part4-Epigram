import Header from '@/components/common/header/header';
import Layout from '@/components/common/layout/layout';
import MyPage from '@/components/myPage/myPage';
import router from 'next/router';

export default function SignIn() {
  return (
    <>
      <Header
        leftContents={
          <img
            src='/ic/back.svg'
            alt='mypage'
            onClick={() => {
              router.back();
            }}
          />
        }
      />
      <Layout>
        <MyPage />
      </Layout>
    </>
  );
}
