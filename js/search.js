document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.querySelector(".search");

  // TMDB API options with Bearer Token
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
        <h2 class="text-white">Movies</h2>
        <div class="row">
          ${movies
            .map(
              (movie) => `
            <div class="col-md-3 mb-4">
              <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path || ""
                }" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">${movie.overview.slice(0, 100)}...</p>
                  <a href="#" class="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
  
        <h2 class="text-white mt-4">TV Series</h2>
        <div class="row">
          ${series
            .map(
              (show) => `
            <div class="col-md-3 mb-4">
              <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${
                  show.poster_path || ""
                }" class="card-img-top" alt="${show.name}">
                <div class="card-body">
                  <h5 class="card-title">${show.name}</h5>
                  <p class="card-text">${show.overview.slice(0, 100)}...</p>
                  <a href="#" class="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      searchMoviesAndSeries(query);
    } else {
      searchResults.innerHTML = ""; // Clear search results if input is empty
    }
  });
});
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
