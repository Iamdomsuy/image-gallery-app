const accessKey = 'KaD6o2jifbNMLxNz0xJ6UuG9aLNwDZP4l421WiXJPBU';
const imageResult = document.getElementById("image-result");
const searchInput = document.getElementById("word-input");
const searchButton = document.getElementById("search-button");
const error = document.getElementById("error");
const theme_button = document.getElementById("theme-button");



// SEARCH IMAGE
async function fetchSearchImg() {
    const randomNumber = Math.floor(Math.random() * 30) + 1
    const value = searchInput.value;
    const searchURL = `https://api.unsplash.com/search/photos?page=${randomNumber}&query=${value}&client_id=${accessKey}&per_page=30`;

    try {
        const response = await fetch(searchURL);

        if (!response.ok) {
            alert("Response is not Okay!");
            throw new Error("HTTP error!: Response is not Okay!");
        }

        const data = await response.json();

        imageResult.innerHTML = ''; 

        if (data.results.length === 0) {
            alert("No images can be found!");
            return;
        }

        data.results.forEach(image => {
            const anchor = document.createElement('a');
            anchor.href = image.links.download;
            anchor.target = "_blank"; 

            const img = document.createElement('img');
            img.src = image.urls.small; 
            img.alt = image.alt_description || "Random Unsplash Image";
            img.title = image.alt_description; 

            anchor.appendChild(img);
            imageResult.appendChild(anchor);
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

searchButton.addEventListener('click', fetchSearchImg);
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchSearchImg();
    }
});

// RANDOM IMAGE
async function fetchRandomImg() {
    const randomURL = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;

    try {
        const response = await fetch(randomURL);

        if (!response.ok) {
            alert("Response is not Okay!");
            throw new Error("HTTP error!: Response is not Okay!");
        }

        const data = await response.json();

        data.forEach(image => {
            const anchor = document.createElement('a');
            anchor.href = image.links.download;
            anchor.target = "_blank";

            const img = document.createElement('img');
            img.src = image.urls.small;
            img.alt = image.alt_description || "Random Unsplash Image";

            anchor.appendChild(img);
            imageResult.appendChild(anchor);
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

window.addEventListener('DOMContentLoaded', fetchRandomImg);

//THEME MODE
const getTheme = localStorage.getItem("theme");
if (getTheme == "dark-theme") {
    document.body.classList.add(getTheme);
}

function theme() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem("theme", "dark-theme");
    } else {
        localStorage.removeItem("theme");
    }
}

theme_button.addEventListener("click", theme);