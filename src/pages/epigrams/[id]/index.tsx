import Header from '@/components/common/header/header';
import Layout from '@/components/common/layout/layout';
import EpigramDetail from '@/components/epigramDetail/epigramDetail';
import ShareBtn from '@/components/epigramDetail/shareBtn/shareBtn';
import router from 'next/router';

export default function Epigram() {
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
        rightContents={<ShareBtn />}
      />
      <Layout>
        <EpigramDetail />
      </Layout>
    </>
  );
}
