// loading data from API
const loadCategories = async() => {
    const url = await `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    dispalyCategory(data.data.news_category);
}

// Display all the category to the UI
const dispalyCategory = async (categories) => {
    // get the Category container
    const categoryContainerUl = document.getElementById("category-container");
    categories.forEach(category => {
        const categoryItem = document.createElement("li");
        categoryItem.innerHTML = `<a href="#" class="text-decoration-none">${category.category_name}</a>`;
        categoryContainerUl.appendChild(categoryItem)
    });
}

loadCategories();