import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEpigramsToday } from '@/apis/epigram';
import EpigramCard from '../../common/ui-epigramCard/ui-epigramCard';

const TodayEpigram: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['epigramToday'],
    queryFn: getEpigramsToday,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const { id, tags, content, author } = data;
  const tagArray = Array.isArray(tags) ? tags : [tags];

  return <EpigramCard id={id} content={content} author={author} tags={tagArray} />;
};

export default TodayEpigram;
