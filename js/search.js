document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelectorAll("#searchInput");
  const searchResults = document.querySelector(".search");
  const searchResultsPhone = searchInput[1];
  const searchResultsDesktop = searchInput[0];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzAzN2I1ZDM1OWRlYTFmZjY3ODg0NDZkNjZmOGJlYyIsIm5iZiI6MTc0MDI2MDQzOS4wMjksInN1YiI6IjY3YmE0NDU3YmQ0OGU4OTI0Y2JlYmMwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8FR_hhe9C2Ebr6V4Vgb_IaCxzFWANqJ74-NYsZ31HsE",
    },
  };

  function searchMoviesAndSeries(query) {
    const movieFetch = fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
      options
    ).then((res) => res.json());

    const seriesFetch = fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US`,
      options
    ).then((res) => res.json());

    Promise.all([movieFetch, seriesFetch])
      .then(([movieData, seriesData]) => {
        displayResults(movieData.results, seriesData.results);
      })
      .catch((err) => console.error("Error fetching search results:", err));
  }

  function displayResults(movies, series) {
    if ((!movies || movies.length === 0) && (!series || series.length === 0)) {
      searchResults.innerHTML = `<p class="text-white">No results found.</p>`;
      return;
    }

    searchResults.innerHTML = `
        <h2 class="text-white my-4">Movies</h2>
        <div class="row">
          ${movies
            .map(
              (movie) => `

            <div class="col-md-3 mb-4">
              <div class="card bg-black text-white">
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path || ""
                }" class="card-img-top main-text" alt="${movie.title}">
                <div class="card-body">
                  <h5 class="card-title main-text fw-bold fs-4">${
                    movie.title
                  }</h5>
                  <p class="card-text">${movie.overview.slice(0, 100)}...</p>
                  <a href="/details-movie.html?id=${
                    movie.id
                  }" class="btn btn-primary bg-my-color border-0">View Details</a>
                </div>
              </div>
            </div>

          `
            )
            .join("")}
        </div>
  
        <h2 class="text-white my-4">TV Series</h2>
        <div class="row">
          ${series
            .map(
              (show) => `
            <div class="col-md-3  mb-4">
              <div class="card bg-black text-white">
                <img src="https://image.tmdb.org/t/p/w500${
                  show.poster_path || ""
                }" class="card-img-top" alt="${show.name}">
                <div class="card-body">
                  <h5 class="card-title main-text fw-bold fs-4">${
                    show.name
                  }</h5>
                  <p class="card-text">${show.overview.slice(0, 100)}...</p>
                  <a href="/details-tv.html?id=${
                    show.id
                  }" class="btn btn-primary  bg-my-color border-0">View Details</a>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
  }

  searchResultsDesktop.addEventListener("input", () => {
    const query = searchResultsDesktop.value.trim();
    if (query.length > 2) {
      searchMoviesAndSeries(query);
    } else {
      searchResults.innerHTML = "";
    }
  });
  searchResultsPhone.addEventListener("input", () => {
    const query = searchResultsPhone.value.trim();
    if (query.length > 2) {
      searchMoviesAndSeries(query);
    } else {
      searchResults.innerHTML = "";
    }
  });
});

let signup = document.querySelector(".signUp");

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
