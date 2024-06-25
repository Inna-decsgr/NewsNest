import React from 'react';

export default function NewsCard({ news }) {
  const { title, thumbnail, link, source } = news;

  return (
    <li>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={thumbnail} alt='Article Thumbnail' />
        {title}
        {source}
      </a>
    </li>
  );
}

