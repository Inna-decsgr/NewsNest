import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsByCategory } from '../api/fetchNewsByCategory';
import NewsCard from '../components/NewsCard';
import { useQuery } from '@tanstack/react-query';


export default function NewsArticle() {
  const category = useParams();
  const { isLoading, error, data: newsdata } = useQuery({ queryKey: ['news', category], queryFn: () => fetchNewsByCategory(category.category) });

  return (
    <>
      {isLoading && <p>뉴스를 가져오는중입니다.</p>}
      {error && <p>Error: {error.message}</p>}
      {newsdata && <ul>
        {
          newsdata.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))
        }
      </ul>}
    </>
  );
}

