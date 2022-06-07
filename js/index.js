import { getArticles } from './modules/element.js';

const setLimit = (newsList, limit) => {
    if (newsList.length >= limit) 
        newsList = newsList.slice(0, limit);
    
    return newsList;
}

const setSearchResultInfo = (searchValue, resultCount) => {
    const setSearchResultInfo = document.querySelector('#searchResultInfo');
    setSearchResultInfo.textContent = `По вашему запросу ${searchValue} найдено ${resultCount} результатов`;
};

const getHeadlines = (count, country) => {
    //fetch("./headlines.json")
    fetch(`https://newsapi.org/v2/top-headlines?country=${country}`, {
        headers: {
            'X-Api-Key': 'dbe9265c97f64687b50e6fb0ab4592cc'
        },
    })
    .then(data => data.json())
    .then(response => {
        const articles = setLimit(response.articles, count);
        getArticles(articles, true);
    });
};

const form = document.querySelector('.form-search');
form.addEventListener('submit', e => {
    e.preventDefault();
    const params = Object.fromEntries(new FormData(e.target));

    fetch(`https://newsapi.org/v2/everything?q=${params.search}`, {
        headers: {
            'X-Api-Key': 'dbe9265c97f64687b50e6fb0ab4592cc'
        },
    })
    //fetch("./search.json")
    .then(data => data.json())
    .then(response => {
        const articles = setLimit(response.articles, 8);
        getArticles(articles, false);
        setSearchResultInfo(params.search, articles.length);
    });

    getHeadlines(4, params.country);

});

form.country.addEventListener('change', () => {
    getHeadlines(8, form.country.value);
});

getHeadlines(8, 'ru');