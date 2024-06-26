import axios from 'axios';

export async function fetchNewsData(keyword) {
  const url = 'http://127.0.0.1:5000/news';

  try {
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error('No data available');
    }

    let data = response.data;

    if (keyword) {
      const filteredData = data.filter(news => news.title.includes(keyword));
      return filteredData;
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching news data: ${error.message}`)
  }
};
