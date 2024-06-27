from flask import Flask, jsonify
from flask_cors import CORS
import feedparser
from bs4 import BeautifulSoup
import requests
from flask_caching import Cache

app = Flask(__name__)
CORS(app)

cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})

NEWS_SOURCES = [
    'http://rss.cnn.com/rss/cnn_topstories.rss',
    'http://feeds.foxnews.com/foxnews/latest',
    'http://feeds.bbci.co.uk/news/rss.xml',
]

def fetch_thumbnail(link):
    response = requests.get(link)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    og_image = soup.find('meta', property='og:image')
    if og_image:
        return og_image['content']
    return None

@cache.cached(timeout=3600)  
def fetch_news():
    all_news = []
    for source in NEWS_SOURCES:
        feed = feedparser.parse(source)
        for entry in feed.entries:
            thumbnail = fetch_thumbnail(entry.link)
            if thumbnail is not None:
                news_item = {
                    'title': entry.title,
                    'link': entry.link,
                    'source': feed.feed.title,
                    'thumbnail': thumbnail,
                    'published': entry.get('published'),
                    'summary': entry.get('summary')
                }
                all_news.append(news_item)
    return all_news

@app.route('/news')
def get_news():
    news = fetch_news()
    return jsonify(news)

if __name__ == '__main__':
    app.run(debug=True)
