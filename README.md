# Newsnest

### 프로젝트 이름
Newsnest

### 프로젝트 설명
뉴스 데이터를 제공하는 백엔드 서버와 이를 활용하여 뉴스 기사들을 검색하고 분류하는 프론트엔드 웹 어플리케이션

### 사용 기술
* 프론트엔드
  * React
  * React-Router
  * React-Query
  * axios
* 백엔드
  * Python
  * Flask
  * Flask-Caching(Caching)
  * Requests(HTTP requests)
  * BeautifulSoup(HTML parsing)


### 구현 사항
* 프론트엔드
  * 뉴스 기사 검색 기능 : 사용자가 입력한 키워드를 통해 뉴스를 검색
  * 뉴스 기사 분류 : 뉴스 소스별로 기사를 분류하여 표시
* 백엔드
  * Flask를 사용하여 서버 구현 : '/news' 엔드포인트를 통해 뉴스 데이터 제공
  * 데이터 수집
    * RSS 피드를 통해 여러 뉴스 소스로부터 기사 수집(CNN, Fox News, BBC)
    * BeautifulSoup을 사용하여 기사에서 썸네일 이미지 추출
  * 캐싱 : Flask-Caching을 사용하여 데이터 캐싱(1시간)
 
### 주요 내용
* 프론트엔드
  * React-Query를 사용하여 백엔드에서 데이터를 비동기적으로 가져오고, React router를 사용하여 페이지 간의 라우팅을 처리한다.
  * News와 NewsArticle 컴포넌트는 각각 키워드로 검색된 뉴스와 카테고리별로 뉴스를 표시한다.
  * NewsCard 컴포넌트는 개별 뉴스 기사를 카드 형태로 보여주고, Header 컴포넌트는 검색과 카테고리 버튼을 포함한다.
* 백엔드 서버 설정
  * Flask와 Flask-CORS를 사용하여 서버를 설정하고, 여러 뉴스 소스에서 데이터를 수집한다
  * BeautifulSoup을 통해 각 뉴스 기사에서 썸네일 이미지를 추출하고 , Flask-Caching을 사용하여 데이터를 캐싱한다.
  * 'fetch_news' 함수는 모든 뉴스 소스의 RSS 피드를 파싱하여 기사 목록을 반환한다.
  *  각 기사는 제목, 링크, 소스, 썸네일, 게시일, 요약 정보를 포함한다.

   
### 문제 해결
이번 프로젝트에서는 백엔드 서버를 구축하고 여러 뉴스 소스로부터 기사를 수집하여 사용자에게 제공하는 기능을 구현하였다.  
구현 과정에서 두 가지 주요 문제가 생겼고, 이를 해결하기 위해 다음과 같은 접근 방식을 다가갔다.
* 문제 1: 뉴스 데이터 중 썸네일 이미지가 제대로 가져와지지 않았다

🥲 문제 설명 : 뉴스 기사를 수집할 때, 각 기사의 소스에서는 이미지를 함께 제공받았지만, RSS 피드에서는 받아오지 못하는 경우가 있었다. 그 때문에 뉴스 카드에서 이미지가 표시되지 않았다.  
🥲 해결 방법 : BeautifulSoup 라이브버리를 사용하여 기사의 HTML 페이지를 파싱하고, 메타 태그에서 og:image 속성을 찾아 썸네일 이미지를 추출하는 함수를 만들었다. 이 함수를 통해 썸네일 이미지를 안정적으로 가져올 수 있었다.
```js
def fetch_thumbnail(link):
    response = requests.get(link)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    og_image = soup.find('meta', property='og:image')
    if og_image:
        return og_image['content']
    return None
```
이 fetch_thumbnail 함수는 전달받은 뉴스 링크를 통해 해당 페이지의 HTML을 가져오고, BeautifulSoup을 사용하여 'og:image' 태그를 찾는다. 해당 메타 태그가 존재한다면 썸네일 이미지를 URL을 반환한다. 이를 통해 각 뉴스 기사에 대해 썸네일 이미지를 추출하고 저장할 수 있게 되었다.

* 문제 2 : 데이터 응답 시간이 너무 오래 걸리는 문제

문제 설명 : 뉴스 데이터를 수집하고 사용자에게 정보를 제공하는 데까지 시간이 너무 오래 걸렸다. 로딩 작업을 해두긴 했지만 네트워크 탭을 확인해보니 거의 1분이나 걸렸다. 3개의 뉴스 소스에서 데이터를 실시간으로 받아오고, 각 뉴스 데이터에서 이미지를 가져오기 위해 파싱을 작업을 하다보니 오래 걸리는 것 같았다. 이러한 응답 지연은 사용자 경험을 저하시킬 수 있는 문제이다.  
해결 방법 :  
(1) 첫 번째 시도 : 처음에는 HTTP 요청 자체를 최소화하려고 해보았다.
```js
def fetch_news(limit_per_source=10):
    all_news = []
    for source in NEWS_SOURCES:
        feed = feedparser.parse(source)
        count = 0
        for entry in feed.entries:
            if count >= limit_per_source:
                break
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
                count += 1
    return all_news

@app.route('/news')
def get_news():
    news = fetch_news(limit_per_source=10)  # 각 소스에서 최대 10개의 뉴스 아이템을 가져옴
    return jsonify(news)
```
이렇게 각 소스에서 가져올 최대 뉴스 데이터 수를 지정할 수 있도록 설정하고 limit에 도달하면 반복문을 중단하도록 해서 각 뉴스 소스마다 10개씩만 받아올 수 있도록 했다. 이렇게 했더니 받아오는 데이터 양이 감소하니 당연히 응답 시간도 짧아졌다. 하지만 이건 근본적인 문제를 해결한 것이 아니라 임시방편 느낌이 나서 다른 방법을 고민해보았다.  

(2) 두 번째 시도
그러다가 이전 프로젝트에서 캐싱 작업을 했던 것이 생각났다. 백엔드에서도 캐싱을 할 수 있나 찾아봤더니 Flask에서 지원하는 Flask-Caching 라이브러리를 사용해서 캐싱을 해보았다. Flask-Caching 공식 홈페이지를 참고해서 캐싱을 설정하고 캐시 유효 시간을 지정했다.  
`cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})` : Cache 클래스 생성자를 호출해서 새로운 캐시를 만들고, `'CACHE_TYPE': 'SimpleCache'`처럼 캐시 설정을 직접 하였다. `@cache.cached(timeout=3600)` 그리고 cached() 데코레이터를 사용해서 데이터가 1시간 정도 유지될 수 있도록 지정하였다.

(3) 결과
캐싱을 적용하면서 요청 수는 증가했지만, 전송된 데이터와 사용된 리소스의 양이 증가하면서도 페이지 로드 완료 시간이 1분에서 10초로 크게 줄었다. 캐싱을 해둔 덕분에 이전에 비해 더 많은 리소스를 클라이언트에게 더 빨리 전달할 수 있게 되었다.

#### 결론
위와 같은 문제 해결 과정을 통해 뉴스 데이터를 수집하고 보여주는 과정에서 발생한 주요 문제들을 효과적으로 해결할 수 있었다. 썸네일 이미지 추출 문제는 BeautifulSoup을 활용한 HTML 파싱으로, 데이터 응답 지연 문제는 Flask-Caching을 통한 캐싱으로 해결하였다. 이러한 접근 방식은 데이터 제공의 신뢰성과 성능을 모두 개선할 수 있는 효과적인 방법이었다고 생각한다.


* 문제 해결하는 과정을 아래 블로그 링크에 좀 더 자세하게 기술해두었다!🤗

https://velog.io/@kimina/Flask-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EC%84%B1%EB%8A%A5-%ED%96%A5%EC%83%81 


### 사용 방법
🥲 백엔드 서버 실행  
프로젝트 디렉토리에서 `app.py` 파일을 실행하여 Flask 서버 시작하기  
`python app.py`

🥲프론트엔드 어플리케이션 실행  
`yarn start`


### 배포 링크
