import React from 'react';
import { fetchNewsData} from '../api/fetchNewsData';
import NewsCard from '../components/NewsCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


export default function News() {
  const { keyword } = useParams();
  const { isLoading, error, data: newsdata } = useQuery({ queryKey: ['news', keyword], queryFn: () => fetchNewsData(keyword) });

  return (
    <>
      {isLoading && <p className='text-lg py-10 font-bold'>기사를 불러오는데 시간이 소요될 수 있습니다. 잠시만 기다려주세요.</p>}
      {error && <p>Error: {error.message}</p>}
      {newsdata && <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-4'>
        {
          newsdata.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))
        }
      </ul>}
    </>
  );
}

