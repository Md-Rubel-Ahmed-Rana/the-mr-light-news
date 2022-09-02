// loading data from API
const loadCategories = async() => {
    const url = await `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.news_category);
}

loadCategories();