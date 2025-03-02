const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzAzN2I1ZDM1OWRlYTFmZjY3ODg0NDZkNjZmOGJlYyIsIm5iZiI6MTc0MDI2MDQzOS4wMjksInN1YiI6IjY3YmE0NDU3YmQ0OGU4OTI0Y2JlYmMwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8FR_hhe9C2Ebr6V4Vgb_IaCxzFWANqJ74-NYsZ31HsE",
  },
};

const sortingResults = document.querySelector(".sorting-results");
const genreFilter = document.getElementById("genreFilter");
const ratingFilter = document.getElementById("ratingFilter");
const sortBy = document.getElementById("sortBy");
const sortAsc = document.getElementById("sortAsc");
const sortDesc = document.getElementById("sortDesc");

let sortOrder = "asc";

fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
  .then((res) => res.json())
  .then((res) => {
    if (!res.genres) throw new Error("Genres not found");
    genreFilter.innerHTML = `<option value="">All Genres</option>`;
    res.genres.forEach((genre) => {
      let option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.name;
      genreFilter.appendChild(option);
    });
  })
  .catch((err) => console.error("Error fetching genres:", err));

function fetchMovies() {
  const selectedGenre = genreFilter.value;
  const selectedRating = ratingFilter.value;
  const selectedSortBy = sortBy.value;

  let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=${selectedSortBy}.${sortOrder}`;
  if (selectedGenre) url += `&with_genres=${selectedGenre}`;
  if (selectedRating) url += `&vote_average.gte=${selectedRating}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      if (!res.results) throw new Error("No movies found");
      displayMovies(res.results);
    })
    .catch((err) => {
      console.error("Error fetching movies:", err);
      sortingResults.innerHTML = `<p class="text-white">Error loading movies.</p>`;
    });
}

function displayMovies(movies) {
  try {
    if (!movies || movies.length === 0) {
      sortingResults.innerHTML = `<p class="text-white">No results found.</p>`;
      return;
    }

    sortingResults.innerHTML = `
        <h2 class="text-white">Movies</h2>
        <div class="row">
          ${movies
            .map(
              (movie) => `
            <div class="col-md-3 mb-4">
              <div class="card border-0">
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path || ""
                }" class="card-img-top" alt="${movie.title}">
                <div class="card-body card-body-myedit bg-black text-white">
                  <h5 class="card-title fw-bold fs-4 main-text">${
                    movie.title
                  }</h5>
                  <p><strong>Rating:</strong> ${movie.vote_average || "N/A"}</p>
                  <p><strong>Release Date:</strong> ${
                    movie.release_date || "Unknown"
                  }</p>
                  <p><strong>Popularity:</strong> ${
                    movie.popularity || "N/A"
                  }</p>
                  <a href="details-movie.html?id=${
                    movie.id
                  }" class="btn btn-primary bg-my-color border-0">View Details</a>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>`;
  } catch (err) {
    console.error("Error displaying movies:", err);
  }
}

genreFilter.addEventListener("change", fetchMovies);
ratingFilter.addEventListener("change", fetchMovies);
sortBy.addEventListener("change", fetchMovies);

sortAsc.addEventListener("click", () => {
  sortOrder = "asc";
  fetchMovies();
});

sortDesc.addEventListener("click", () => {
  sortOrder = "desc";
  fetchMovies();
});

fetchMovies();
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
