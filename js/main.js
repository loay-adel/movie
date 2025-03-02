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

// Check if user is signed up
const storedData = localStorage.getItem("signupData");
if (storedData) {
  const userData = JSON.parse(storedData);
  const username = userData.username || "User";

  signup.textContent = username;

  signup.addEventListener("click", function (event) {
    event.preventDefault();

    let existingSignOut = document.querySelector(".signOut");
    if (existingSignOut) {
      existingSignOut.remove();
      return;
    }

    let signOut = document.createElement("span");
    signOut.textContent = "Sign Out";
    signOut.classList.add("signOut");
    signOut.style.cssText = `
      color: red;
      font-weight: bold;
      cursor: pointer;
      position: absolute;
      bottom: -1.5em;
      left: 1em;
    `;

    signOut.addEventListener("click", () => {
      localStorage.removeItem("signupData");
      signup.textContent = "Sign Up";
      signup.setAttribute("href", "signup.html");
      location.reload();
    });

    signup.appendChild(signOut);
  });
} else {
  signup.textContent = "Sign Up";
  signup.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
}

const moviesGallery = document.querySelector("div.the-gallery");
const seriesGallery = document.querySelector("div.the-series-gallery");

const showMoviesBtn = document.getElementById("showMoviesBtn");
const hideMoviesBtn = document.getElementById("hideMoviesBtn");
const showSeriesBtn = document.getElementById("showSeriesBtn");
const hideSeriesBtn = document.getElementById("hideSeriesBtn");

let allMovies = [];
let allSeries = [];

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

function displayItems(items, container, limit) {
  const count = limit > items.length ? items.length : limit;
  const itemsToShow = items.slice(0, count);
  const html = itemsToShow
    .map((item) => {
      const posterPath = item.poster_path
        ? `https://image.tmdb.org/t/p/w400/${item.poster_path}`
        : "https://via.placeholder.com/400x600?text=No+Image";

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
    document.getElementById("toggleSidebar").innerText = "Close Sidebar";
  } else {
    sidebar.classList.remove("d-flex");
    sidebar.classList.add("d-none");
    document.getElementById("toggleSidebar").innerText = "Open Sidebar";
  }
});

// ------------------------------
// Search Functionality Code
// --------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const moviesGallery = document.querySelector(".the-gallery");
  const API_KEY = "YOUR_API_KEY";

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      searchMovies(query);
    } else {
      moviesGallery.innerHTML = "";
    }
  });
});
