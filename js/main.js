// TMDB API options
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzAzN2I1ZDM1OWRlYTFmZjY3ODg0NDZkNjZmOGJlYyIsIm5iZiI6MTc0MDI2MDQzOS4wMjksInN1YiI6IjY3YmE0NDU3YmQ0OGU4OTI0Y2JlYmMwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8FR_hhe9C2Ebr6V4Vgb_IaCxzFWANqJ74-NYsZ31HsE",
  },
};

let signup = document.querySelector(".signUp");

if (localStorage.key("signupData") != "") {
  const storedData = JSON.parse(localStorage.getItem("signupData"));
  const username = storedData ? storedData.name : "signup";
  signup.addEventListener("click", (stop) => {
    stop.preventDefault();
    let signOut = document.createElement("span");
    signOut.textContent = "Sign Out";
    signOut.style.color = "Red";
    signOut.style.fontWeight = "bold";
    signOut.style.cursor = "pointer";
    signOut.style.position = "absolute";
    signOut.style.bottom = "-1.5em";
    signOut.style.left = "1em";
    signOut.addEventListener("click", () => {
      signup.innerHTML = "Sign Up";
      signup.addEventListener("click", () => {
        window.location.href = "signup.html";
      });
    });
    signup.appendChild(signOut);
  });
  signup.innerHTML = username;
}
const moviesGallery = document.querySelector("div.the-gallery");
const seriesGallery = document.querySelector("div.the-series-gallery");

const showMoviesBtn = document.getElementById("showMoviesBtn");
const hideMoviesBtn = document.getElementById("hideMoviesBtn");
const showSeriesBtn = document.getElementById("showSeriesBtn");
const hideSeriesBtn = document.getElementById("hideSeriesBtn");

let allMovies = [];
let allSeries = [];

// Fetch popular movies

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((data) => {
    allMovies = data.results;
    displayItems(allMovies, moviesGallery, 4);
  })
  .catch((err) => console.error(err));

// Fetch popular series (using a trending endpoint as an example)
fetch(
  "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((data) => {
    allSeries = data.results;
    console.log(data);

    displayItems(allSeries, seriesGallery, 4);
  })
  .catch((err) => console.error(err));

// Function to display items with a given limit
function displayItems(items, container, limit) {
  const count = limit > items.length ? items.length : limit;
  const itemsToShow = items.slice(0, count);
  const html = itemsToShow
    .map((item) => {
      const posterPath = item.poster_path
        ? `https://image.tmdb.org/t/p/w400/${item.poster_path}`
        : "https://via.placeholder.com/400x600?text=No+Image";
      // For movies, link to details-movie.html; for series, link to details-tv.html.
      // Here we assume if item.original_title exists, it's a movie; otherwise it's TV.
      const detailPage = item.original_title
        ? "details-movie.html"
        : "details-tv.html";
      return `<div class="col-md-3 mb-5">
                <a href="${detailPage}?id=${
        item.id
      } "class="text-decoration-none">
                  <div class="card w-100 position-relative border-0">
                    <img src="${posterPath}" class="card-img-top" alt="${
        item.original_title || item.name
      }">
                    <div class="card-body card-body-myedit bg-black text-white">
                      <h5 class="card-title fw-bold fs-4 main-text">${
                        item.original_title || item.name
                      }</h5>
                      <p class="card-text">${item.overview.substring(
                        0,
                        100
                      )}...</p>
                    </div>
                  </div>
                </a>
              </div>`;
    })
    .join("");
  container.innerHTML = `<div class="row">${html}</div>`;
}

// Movies "Show More" and "Show Less" events
showMoviesBtn.addEventListener("click", () => {
  displayItems(allMovies, moviesGallery, allMovies.length);
  showMoviesBtn.style.display = "none";
  hideMoviesBtn.style.display = "inline-block";
});

hideMoviesBtn.addEventListener("click", () => {
  displayItems(allMovies, moviesGallery, 4);
  hideMoviesBtn.style.display = "none";
  showMoviesBtn.style.display = "inline-block";
});

// Series "Show More" and "Show Less" events
showSeriesBtn.addEventListener("click", () => {
  displayItems(allSeries, seriesGallery, allSeries.length);
  showSeriesBtn.style.display = "none";
  hideSeriesBtn.style.display = "inline-block";
});

hideSeriesBtn.addEventListener("click", () => {
  displayItems(allSeries, seriesGallery, 4);
  hideSeriesBtn.style.display = "none";
  showSeriesBtn.style.display = "inline-block";
});

// ------------------------------
// Sidebar Toggle Code
// ------------------------------
document.getElementById("toggleSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("d-none")) {
    sidebar.classList.remove("d-none");
    sidebar.classList.add("d-flex");
  } else {
    sidebar.classList.remove("d-flex");
    sidebar.classList.add("d-none");
  }
});

// ------------------------------
// Search Functionality Code
// --------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const moviesGallery = document.querySelector(".the-gallery");
  const API_KEY = "YOUR_API_KEY"; // Replace with your TMDb API key

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      searchMovies(query);
    } else {
      moviesGallery.innerHTML = ""; // Clear results if input is empty
    }
  });
});
