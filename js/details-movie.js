const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzAzN2I1ZDM1OWRlYTFmZjY3ODg0NDZkNjZmOGJlYyIsIm5iZiI6MTc0MDI2MDQzOS4wMjksInN1YiI6IjY3YmE0NDU3YmQ0OGU4OTI0Y2JlYmMwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8FR_hhe9C2Ebr6V4Vgb_IaCxzFWANqJ74-NYsZ31HsE",
  },
};

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
const actress = document.querySelector("div.actress");
const movieId = getQueryParam("id");
const detailsContainer = document.getElementById("detailsContainer");

if (movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then((res) => res.json())
    .then((movie) => {
      const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

      const html = `
          <div class="col-md-4">
            <img src="${posterPath}" class="img-fluid" alt="${
        movie.original_title
      }" />
          </div>
          <div class="col-md-8 position-relative">
            <h2>${movie.original_title}</h2>
            <p><strong class="text-white">Genre:</strong> ${movie.genres
              .map((extract) => extract.name)
              .join(", ")}</p>
            
            <p><strong class="text-white">Release Date:</strong> ${
              movie.release_date || "N/A"
            }</p>
            <p><strong class="text-white">Rating:</strong> ${
              movie.vote_average || "N/A"
            } / 10</p>
            <p><strong class="text-white">Overview:</strong></p>
            <p>${movie.overview || "No overview available."}</p>
            
          </div>
        `;
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          data.cast.forEach((actor) => {
            const profilePath = actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : "https://via.placeholder.com/500x750?text=No+Image";

            const html = `<div class="card bg-black main-text" style="width: 14em;">
          <img src="${profilePath}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${actor.character}</h5>
        
          </div>
        </div>`;
            actress.innerHTML += html;
          });
        })
        .catch((err) => console.error(err));
      detailsContainer.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      detailsContainer.innerHTML = "<p>Error loading movie details.</p>";
    });
} else {
  detailsContainer.innerHTML = "<p>No movie ID provided.</p>";
}
