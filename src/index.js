import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/NotFound';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, element: <News />
      },
      {
        path: '/news', element: <News />
      },
      {
        path: '/news/:keyword',
        element: <News />
      },
      {
        path: '/news/article/:category',
        element: <NewsArticle />
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
