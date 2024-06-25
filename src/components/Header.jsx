import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const buttons = [
  {category: 'CNN', path: '/news/article/CNN'},
  {category: 'Foxnews', path: '/news/article/Fox'},
  {category: 'BBC', path: '/news/article/BBC'},
]

export default function Header() {
  const [text, setText] = useState('');
  const { keyword } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/news/${text}`)
  }
  useEffect(() => {
    setText(keyword || '')
  }, [keyword])
  
  return (
    <header className='flex justify-between items-center py-6'>
      <Link to ='/'>
        <h1 className='text-4xl font-bold text-blue-700'>Newsnest</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='검색어를 입력하세요'
          value={text}
          className='border border-gray-400 w-80 p-2 pl-2 rounded-tl-md rounded-bl-md'
          onChange={handleChange}
        />
        <button className='bg-blue-700 border border-blue-700 rounded-tr-md rounded-br-md p-2 text-white font-bold'>검색</button>
      </form>
      <div>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => navigate(button.path)}
            className='text-blue-700 font-bold text-lg px-4'
          >
            {button.category}
          </button>
        ))}
      </div>
    </header>
  );
}

