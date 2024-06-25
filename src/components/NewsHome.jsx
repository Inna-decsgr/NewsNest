import React from 'react';
import NewsCard from './NewsCard';
import SideBar from './SideBar';
import { useParams } from 'react-router-dom';

export default function NewsHome({ newsdata }) {
  const { keyword } = useParams();

  return (
    <section className='flex flex-col lg:flex-row'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4'>
        {
          newsdata.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))
        }
      </ul>
      {!keyword && (
        <div className='ml-4'>
          <SideBar />
        </div>
      )}
    </section>
  );
}

