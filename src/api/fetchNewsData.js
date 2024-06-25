export async function fetchNewsData(keyword) {
  const response = await fetch('http://127.0.0.1:5000/news');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  if (keyword) {
    const filteredData = data.filter(news => news.title.includes(keyword));
    return filteredData;
  }
  return data;
};
