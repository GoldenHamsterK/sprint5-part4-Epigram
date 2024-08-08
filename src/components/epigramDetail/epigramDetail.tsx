import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { GetEpigramsIdResponseType, DeleteEpigramsIdRequestType } from '@/schema/epigram';
import type { GetUserReponseType } from '@/schema/user';
import { getEpigramsId, deleteEpigramsId } from '@/apis/epigram';
import { getMe } from '@/apis/user';
import classNames from 'classnames/bind';
import styles from './epigramDetail.module.scss';
import LikeCount from './likeCount/likeCount';

const cx = classNames.bind(styles);

const EpigramDetail: React.FC = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const numericId: number = Number(queryId);

  const {
    data: epigramData,
    error: epigramError,
    isLoading: epigramLoading,
  } = useQuery<GetEpigramsIdResponseType>({
    queryKey: ['epigram', numericId],
    queryFn: () => getEpigramsId({ id: numericId }),
    enabled: !!numericId,
  });

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery<GetUserReponseType>({
    queryKey: ['user'],
    queryFn: () => getMe(),
    enabled: !!numericId,
  });

  const deleteEpigramsmutation = useMutation({
    mutationFn: deleteEpigramsId,
    onSuccess: () => {
      window.alert('에피그램 삭제가 완료되었습니다.');
      router.push(`/epigrams/`);
    },
  });

  const isLoading = epigramLoading || userLoading;
  const error = epigramError || userError;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 에러'}</div>;

  if (!epigramData) return <div>데이터가 없습니다.</div>;

  const { id, tags, content, author, likeCount, referenceUrl, writerId, isLiked } = epigramData;

  const tagList =
    Array.isArray(tags) &&
    tags.map((tag: any) => (
      <div key={tag.id} className={cx('tag-item')}>
        #{tag.name}
      </div>
    ));

  const handleEdit = () => {
    alert('수정 버튼 클릭');
  };

  const handleDelete = () => {
    const requestData: DeleteEpigramsIdRequestType = { id: epigramData.id };
    deleteEpigramsmutation.mutate(requestData);
  };

  const handleReferenceClick = () => {
    if (referenceUrl) {
      window.open(referenceUrl, '_blank');
    } else {
      window.alert('url이 없습니다.');
    }
  };

  return (
    <section className={cx('epigram-detail-wrap')}>
      {writerId === userData?.id && (
        <div className={cx('epigram-btn')}>
          <button className={cx('epigram-Edit')} onClick={handleEdit}>
            수정
          </button>
          <button className={cx('epigram-Delete')} onClick={handleDelete}>
            삭제
          </button>
        </div>
      )}
      <h4 className={cx('epigram-tags')}>{tagList}</h4>
      <h2 className={cx('epigram-content')}>{content}</h2>
      <h3 className={cx('epigram-author')}>-{author}-</h3>
      <div className={cx('btns')}>
        <LikeCount id={id} likeCount={likeCount} isLiked={isLiked} />
        <button className={cx('external-link-btn')} onClick={handleReferenceClick}>
          왕도로 가는길
          <img className={cx('ic-external-link')} alt='external-link' src='/ic/external-link.svg' />
        </button>
      </div>
    </section>
  );
};

export default EpigramDetail;
