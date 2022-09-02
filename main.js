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
        console.log(category);
        const categoryItem = document.createElement("li");
        categoryItem.classList.add("text-center");
        categoryItem.innerHTML = `<a onclick="loadMatchedNews('${category.category_id}')" href="#" class="text-decoration-none">${category.category_name}</a>`;
        categoryContainerUl.appendChild(categoryItem)
    });
};

// load matched news
const loadMatchedNews = async(id) => {
    const url = await `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data =await res.json();

}

// loading all the news data
const loadAllNews = async () => {
    const url = await `https://openapi.programming-hero.com/api/news/category/08`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
}


// Display all the news to the UI
const dispalyNews = async () => {
    // get the news container;
    const newsContainer = document.getElementById("news-container");
    const allNews = await loadAllNews();
    // console.log(allNews);
    allNews.forEach(news => {
        // console.log(news);
        // create element to show news to the UI
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("col");
        newsDiv.innerHTML = `
            <div class="card h-100 p-4">
                <img src="${news.thumbnail_url}" class="card-img-top" alt="..." style="height: 300px;" >
                <div class="card-body p-2">
                        <h5 class="card-title"> ${news.title} </h5>
                        <p class="card-text"> ${news.details.slice(0, 200)}...</p>
                    <div class="m-auto text-center">
                        <button class="btn btn-primary">Details</button>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <div>
                            <img src="${news.author.img}" class="rounded-circle" style="height: 50px; width: 50px" />
                        </div>
                        <div>
                            <p class="m-0"> ${ news.author.name === null || news.author.name === "system" ? "Author Name not available" : news.author.name} </p>
                            <p> ${news.author.published_date === null ? "No Date available" : news.author.published_date} </p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center gap-2">
                          <p><i class="fa-solid fa-eye"></i></p>
                          <p> ${news.total_view}M </p>
                        </div>
                        <div class="m-0">
                           <i class="fa-regular fa-star-half-stroke"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>

                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsDiv)
    })
}


dispalyNews()
dispalyCategory();