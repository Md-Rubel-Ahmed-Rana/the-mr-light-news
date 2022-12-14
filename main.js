// loading category data from API
const loadCategories = async() => {
    try {
        const url = await `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
    } catch (error) {
        alert(error);
    }
}

// Display all the category to the UI
const dispalyCategory = async () => {
    try {
        // get all the categories
        const allCategories = await loadCategories();
        // get the Category container
        const categoryContainerUl = document.getElementById("category-container");
        allCategories.forEach(category => {
            const categoryItem = document.createElement("li");
            categoryItem.classList.add("text-center");
            categoryItem.innerHTML = `<a onclick="loadMatchedNews('${category.category_id}')" href="#" class="text-decoration-none">${category.category_name}</a>`;
            categoryContainerUl.appendChild(categoryItem);
        });
    } catch (error) {
        alert(error)
    }
};


// loader element
const loader = document.getElementById("loader");

// load matched news
const loadMatchedNews = async(id) => {
    try {
        loader.classList.remove("d-none");
        const url = await `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayMatchedNews(data.data);
    } catch (error) {
        alert(error)
    }
}


// Display the Matched news with the category
const displayMatchedNews = (allMatchedNews) => {
   try {
       // show sorted message
       const sortMessage = document.getElementById("sort-meassage");
       sortMessage.value = "Most Views"
       // sorting
       allMatchedNews.sort((a, b) => {
           return b.total_view - a.total_view
       });

       const newsContainer = document.getElementById("news-container");
       newsContainer.textContent = "";
       if (allMatchedNews.length === 0) {
           loader.classList.add("d-none");
       } else {
           loader.classList.add("d-none");
       }

       // show found item amount
       const itemAmount = document.getElementById("item-amount");
       itemAmount.innerText = allMatchedNews.length;

       // show the text how many category is found
       const itemAmountDiv = document.getElementById("found-news-amount");
       itemAmountDiv.classList.remove("d-none");
       allMatchedNews.forEach(news => {
           const newsDiv = document.createElement("div");
           newsDiv.classList.add("col");
           newsDiv.innerHTML = `
            <div class="card h-100 p-4">
                <img src="${news.thumbnail_url}" class="card-img-top" alt="..." style="height: 300px;" >
                <div class="card-body p-2">
                        <h5 class="card-title"> ${news.title} </h5>
                        <p class="card-text"> ${news.details.slice(0, 200)}...</p>
                    <div class="m-auto text-center">
                        <button onclick="loadMatchedNewsArray('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#matchedNewsDetails">Details</button>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <div>
                            <img src="${news.author.img}" class="rounded-circle" style="height: 50px; width: 50px" />
                        </div>
                        <div>
                            <p class="m-0"> ${news.author.name === null || news.author.name === "system" ? "Author Name not available" : news.author.name} </p>
                            <p> ${news.author.published_date === null ? "No Date available" : news.author.published_date} </p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center gap-2">
                          <p><i class="fa-solid fa-eye"></i></p>
                          <p> ${news.total_view === null ? "No Data Found" : news.total_view}M </p>
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
   } catch (error) {
    alert(error);
   }
}

// load an array of matched news
const loadMatchedNewsArray = async (id) => {
    try {
        const url = await `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayMatchedNewsDetails(data.data[0]);
    } catch (error) {
        alert(error);
    }
}

// display deatails of the matched news
const displayMatchedNewsDetails = (matchedNews) => {
    try {
        const image = document.getElementById("image")
        image.src = matchedNews.author.img;
        const name = document.getElementById("name");
        name.innerText = matchedNews.author.name === null || matchedNews.author.name === "system" || matchedNews.author.name === "" ? "No Data found" : "Author Name: " + matchedNews.author.name;
        const date = document.getElementById("date");
        date.innerText = matchedNews.author.published_date === null ? "No Data Found" : "Date: " + matchedNews.author.published_date;
        const totalView = document.getElementById("view");
        totalView.innerText = matchedNews.total_view === null ? "No Data Found" : "Views: " + matchedNews.total_view + "M";
        const rate = document.getElementById("rate");
        rate.innerText = "Rating " + matchedNews.rating.number;
    } catch (error) {
        alert(error)
    }
}

// loading all the news data
const loadAllNews = async () => {
    try {
        const url = await `https://openapi.programming-hero.com/api/news/category/08`;
        const res = await fetch(url);
        const data = await res.json();
        dispalyNews(data.data);
    } catch (error) {
        alert(error)
    }
}



// Display all the news to the UI
const dispalyNews =  (data) => {
    try {
        // show sorted message
        const sortMessage = document.getElementById("sort-meassage");
        sortMessage.value = "Most Views"
        // sorting
        data.sort((a, b) => {
            return b.total_view - a.total_view
        });
        // get the news container;
        const newsContainer = document.getElementById("news-container");
        data.forEach(news => {
            // create element to show news to the UI
            const newsDiv = document.createElement("div");
            newsDiv.classList.add("col");
            newsDiv.innerHTML = `
            <div class="card h-100 p-4">
                <img src="${news.thumbnail_url}" class="card-img-top" alt="..." style="height: 300px;" >
                <div class="card-body p-2">
                        <h5 class="card-title"> ${news.title} </h5>
                        <p class="card-text"> ${news.details.slice(0, 150)}...</p>
                    <div class="m-auto text-center">
                        <button onclick="loadDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetails">Show Details</button>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <div>
                            <img src="${news.author.img}" class="rounded-circle" style="height: 50px; width: 50px" />
                        </div>
                        <div>
                            <p class="m-0"> ${news.author.name === null || news.author.name === "system" ? "Author Name not available" : news.author.name} </p>
                            <p> ${news.author.published_date === null ? "No Date available" : news.author.published_date} </p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center gap-2">
                          <p><i class="fa-solid fa-eye"></i></p>
                          <p> ${news.total_view === null ? "No Data Found" : news.total_view} M </p>
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
    } catch (error) {
        alert(error)
    }
}

// load details to show on Modal
const loadDetails = async(id) => {
    try {
        const url = await `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        showDetails(data.data[0]);
    } catch (error) {
        alert(error);
    }
}

const showDetails = async (data) => {
    try {
        const image = document.getElementById("modal-img");
        image.src = data.author.img;
        const name = document.getElementById("author-name");
        name.innerText = data.author.name === null || data.author.name === "system" || data.author.name === "" ? "No Data found" : "Author Name: " + data.author.name;
        const date = document.getElementById("publish-date");
        date.innerText = data.author.published_date === null ? "No Data Found" : "Date: " + data.author.published_date;
        const totalView = document.getElementById("total-view");
        totalView.innerText = data.total_view === null ? "No Data Found" : "Views: " + data.total_view + "M";
        const rate = document.getElementById("rating");
        rate.innerText = "Rating " + data.rating.number;
    } catch (error) {
        alert(error)
    }
}

loadAllNews();
dispalyCategory();