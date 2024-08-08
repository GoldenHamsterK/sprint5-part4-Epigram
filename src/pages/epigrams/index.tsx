import Epigram from '@/components/epigram/epigram';
import Header from '@/components/common/header/header';
import router from 'next/router';
import Layout from '@/components/common/layout/layout';

export default function Epigrams() {
  return (
    <>
      <Header
        rightContents={
          <img
            src='/ic/mypage.svg'
            alt='mypage'
            onClick={() => {
              router.push('/mypage');
            }}
          />
        }
      />
      <Layout>
        <Epigram />
      </Layout>
    </>
  );
}
