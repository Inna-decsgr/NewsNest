import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsByCategory } from '../api/fetchNewsByCategory';
import NewsCard from '../components/NewsCard';
import { useQuery } from '@tanstack/react-query';


export default function NewsArticle() {
  const category = useParams();
  const categories = category.category;
  const { isLoading, error, data: newsdata } = useQuery({ queryKey: ['news', category], queryFn: () => fetchNewsByCategory(categories) });

  return (
    <>
      {isLoading && <p className='text-lg py-10 font-bold'>
        {`ㆍㆍㆍ${categories} 뉴스를 가져오는중입니다ㆍㆍㆍ`}
      </p>}
      {error && <p>Error: {error.message}</p>}
      {newsdata && <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4'>
        {
          newsdata.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))
        }
      </ul>}
    </>
  );
}

