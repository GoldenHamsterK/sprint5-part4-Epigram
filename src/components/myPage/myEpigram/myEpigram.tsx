import { useQuery } from '@tanstack/react-query';
import type { GetEpigramsResponseType } from '@/schema/epigram';
import { getEpigrams } from '@/apis/epigram';
import classNames from 'classnames/bind';
// import styles from '../epigram.module.scss';
import { GetUserReponseType } from '@/schema/user';
import { getMe } from '@/apis/user';
import router, { useRouter } from 'next/router';
import EpigramCard from '../../common/ui-epigramCard/ui-epigramCard';

// const cx = classNames.bind(styles);

const MyEpigram: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const numericId: number = Number(queryId);
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery<GetUserReponseType>({
    queryKey: ['user', numericId],
    queryFn: () => getMe(),
    enabled: !!numericId,
  });

  const {
    data: epigramsData,
    error: epigramsError,
    isLoading: epigramsIsLoading,
  } = useQuery<GetEpigramsResponseType>({
    queryKey: ['getEpigrams'],
    queryFn: async () => getEpigrams({ limit: 10, writerId: userData?.id }),
    enabled: true,
  });

  const isLoading = epigramsIsLoading || userLoading;
  const error = epigramsError || userError;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  const epigramList = epigramsData?.list.map((epigram) => {
    const tagsArray = Array.isArray(epigram.tags) ? epigram.tags : [epigram.tags];
    return <EpigramCard key={epigram.id} id={epigram.id} content={epigram.content} author={epigram.author} tags={tagsArray} />;
  });

  return <div>{epigramList}</div>;
};

export default MyEpigram;
