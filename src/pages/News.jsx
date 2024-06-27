import React from 'react';
import { fetchNewsData} from '../api/fetchNewsData';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NewsHome from '../components/NewsHome';


export default function News() {
  const { keyword } = useParams();
  const { isLoading, error, data: newsdata } = useQuery({ queryKey: ['news', keyword], queryFn: () => fetchNewsData(keyword)});

  return (
    <>
      {isLoading && <p className='text-lg py-10 font-bold'>ㆍㆍㆍ뉴스를 불러오는데 시간이 소요될 수 있습니다. 잠시만 기다려주세요ㆍㆍㆍ</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error &&newsdata && newsdata.length > 0 && (
        <NewsHome newsdata={newsdata} />
      )}
      {!isLoading && !error && newsdata && newsdata.length === 0 && (
        <p className='text-lg py-10 font-bold'>{`'${keyword}' 로 검색한 결과가 없습니다`}</p>
      )}
    </>
  );
}

