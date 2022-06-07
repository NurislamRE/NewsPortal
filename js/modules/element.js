const createArticles = (data) => new Promise((resolve, reject) => {
    const li = document.createElement('li');
    li.className = 'news-item';
    const img = document.createElement('img');
    img.src = data.urlToImage || 'img/maket.png';
    img.alt = data.title;
    img.className = 'news-image';

    const h3 = document.createElement('h3');
    h3.className = 'news-title';
    const a = document.createElement('a');
    a.href = data.url;
    a.className = 'news-link';
    a.textContent = data.title;
    h3.append(a);

    const p = document.createElement('p');
    p.className = 'news-description';
    p.append(data.description);

    const div = document.createElement('div');
    div.className = 'news-footer';

    const time = document.createElement('time');
    time.className = 'news-datetime';
    time.setAttribute('datetime', data.publishedAt);

    const span = document.createElement('span');
    span.className = 'news-date';
    span.append(data.publishedAt);
    time.append(span);

    const p2 = document.createElement('p');
    p2.className = 'news-author';
    p2.append(data.author);
    div.append(time, p2);

    li.append(img, h3, p, div);

    img.addEventListener('load', () => {
        resolve(li);
    });
});

const getPromises = newsList => {
    const promiseList = newsList.map(article => {
        return createArticles(article);
    });
    return promiseList;
}

const insertArticles = async promiseList => Promise.all(promiseList);

export const getArticles = (newsList, isHeadlines) => {
    const promises = getPromises(newsList);
    console.log(promises);
    insertArticles(promises).then(data => {
        if (isHeadlines) {
            const news_list = document.querySelector('#news_list_headlines');
            news_list.textContent = '';
            news_list.append(...data);

        } else {
            const news_list = document.querySelector('#news_list');
            news_list.textContent = '';
            news_list.append(...data);
        }
        let preloaderEl = document.getElementById('preloader');
        preloaderEl.classList.add('hidden');
        preloaderEl.classList.remove('visible');
    })
}