export async function fetchNewsByCategory(category) {
  const response = await fetch('http://127.0.0.1:5000/news');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  if (category) {
    const filteredData = data.filter(news => news.source.includes(category));
    return filteredData;
  }

  return data;
}