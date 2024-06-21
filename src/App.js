import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 뉴스 데이터를 담을 state
  const [newsData, setNewsData] = useState([]);

  // 컴포넌트가 마운트될 때 한 번만 데이터를 가져오기 위해 useEffect 사용
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/news'); // Flask 백엔드 주소로 변경
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsData(data); // 데이터를 state에 저장
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNewsData(); // 데이터 가져오는 함수 호출
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 설정


  return (
    <div className="App">
      <h1>Latest News</h1>
      <ul>
        {newsData.map((news, index) => (
          <li key={index}>
            <img src={news.thumbnail} alt='Thumbnail' />
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              {news.title}
            </a> - {news.source}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
