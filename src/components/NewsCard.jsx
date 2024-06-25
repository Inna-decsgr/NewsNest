import React from 'react';

export default function NewsCard({ news }) {
  const { title, thumbnail, link, published, summary} = news;

  return (
    <li className='transition ease-in-out hover:scale-105 hover:shadow-xl p-3'>
      <a href={link} target="_target" rel="noopener noreferrer">
        <img src={thumbnail} alt='Article Thumbnail' />
        <span className='text-lg font-bold line-clamp-2'>{title}</span>
      </a>
      <p className='text-sm line-clamp-2'>{summary}</p>
      <span className='text-sm text-gray-500'>{published}</span>
    </li>
  );
}

