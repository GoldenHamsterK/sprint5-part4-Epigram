import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { GetEpigramsResponseType } from '@/schema/epigram';
import { getEpigrams } from '@/apis/epigram';
import classNames from 'classnames/bind';
import styles from '../epigram.module.scss';
import EpigramCard from '../../common/ui-epigramCard/ui-epigramCard';

const cx = classNames.bind(styles);

const EpigramList: React.FC = () => {
  const { data, error, isLoading } = useQuery<GetEpigramsResponseType>({
    queryKey: ['getEpigrams'],
    queryFn: async () => getEpigrams({ limit: 10 }),
    enabled: true,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const epigramList = data.list.map((epigram) => {
    const tagsArray = Array.isArray(epigram.tags) ? epigram.tags : [epigram.tags];
    return <EpigramCard key={epigram.id} id={epigram.id} content={epigram.content} author={epigram.author} tags={tagsArray} />;
  });

  return <div>{epigramList}</div>;
};

export default EpigramList;
