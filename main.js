// loading data from API
const loadCategories = async() => {
    const url = await `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
}

// Display all the category to the UI
const dispalyCategory = async () => {
    // get all the categories
    const allCategories = await loadCategories();
    // get the Category container
    const categoryContainerUl = document.getElementById("category-container");
    allCategories.forEach(category => {
        const categoryItem = document.createElement("li");
        categoryItem.innerHTML = `<a href="#" class="text-decoration-none">${category.category_name}</a>`;
        categoryContainerUl.appendChild(categoryItem)
    });
};


// loading all the news data
const loadAllNews = async () => {
    const url = await `https://openapi.programming-hero.com/api/news/category/08`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
}


// Display all the news to the UI
const dispalyNews = async () => {
    const allNews = await loadAllNews();
    allNews.forEach(news => {
        console.log(news);
    })
}


dispalyNews()
dispalyCategory();