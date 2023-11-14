const ApiKey = "Your Unsplash ApikKey here";

const searchForm = document.getElementById('Search-form');
const searchBox = document.getElementById('Search');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');


let keywords = "";
let page = 1;

async function searchImage(){

    keywords= searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keywords}&client_id=${ApiKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    //console.log(data.errors);

    if(page === 1){
        searchResult.innerHTML = "";
    }

    const result = data.results;
    result.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        
        imageLink.appendChild(image);
        
        searchResult.appendChild(imageLink);
        
    }) 

    showMoreBtn.style.display = "block";

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("it's being Called");
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImage();
})