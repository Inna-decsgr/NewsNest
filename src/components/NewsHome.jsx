import React from 'react';
import NewsCard from './NewsCard';

export default function NewsHome({ newsdata }) {
  return (
    <section className='flex flex-col lg:flex-row'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4'>
        {
          newsdata.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))
        }
      </ul>
    </section>
  );
}

