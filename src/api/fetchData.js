import axios from 'axios';

export async function fetchNewsByCategory(category) {
  return fetchData(category, 'source');
}

export async function fetchNewsData(keyword) {
  return fetchData(keyword, 'title');
}


async function fetchData(filterValue, filterKey) {
  const url = 'http://127.0.0.1:5000/news';

  try {
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error('No data available');
    }

    let data = response.data;

    if (filterValue) {
      const filteredData = data.filter(news => news[filterKey].includes(filterValue));
      return filteredData;
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching news data: ${error.message}`)
  }
}