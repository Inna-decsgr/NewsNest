from flask import Flask, jsonify
from flask_cors import CORS
import feedparser
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Dummy list of news sources (you can add more)
NEWS_SOURCES = [
    'http://rss.cnn.com/rss/cnn_topstories.rss',
    'http://feeds.foxnews.com/foxnews/latest',
    'http://feeds.bbci.co.uk/news/rss.xml',
]

def get_thumbnail(link):
    response = requests.get(link)
    soup = BeautifulSoup(response.content, 'html.parser')
    og_image = soup.find('meta', property='og:image')
    if og_image:
        return og_image['content']
    return None

@app.route('/news')
def get_news():
    all_news = []
    for source in NEWS_SOURCES:
        feed = feedparser.parse(source)
        for entry in feed.entries:
            # Check if all attributes of entry are not None
            if all(getattr(entry, attr) is not None for attr in entry.keys()):
                thumbnail = get_thumbnail(entry.link)
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
    return jsonify(all_news)


if __name__ == '__main__':
    app.run(debug=True)
