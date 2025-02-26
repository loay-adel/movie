const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzAzN2I1ZDM1OWRlYTFmZjY3ODg0NDZkNjZmOGJlYyIsIm5iZiI6MTc0MDI2MDQzOS4wMjksInN1YiI6IjY3YmE0NDU3YmQ0OGU4OTI0Y2JlYmMwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8FR_hhe9C2Ebr6V4Vgb_IaCxzFWANqJ74-NYsZ31HsE",
  },
};
// let signup = document.querySelector(".signUp");

// if (localStorage.key("signupData") != "") {
//   const storedData = JSON.parse(localStorage.getItem("signupData"));
//   const username = storedData ? storedData.name : "signup";
//   signup.addEventListener("click", (stop) => {
//     stop.preventDefault();
//     let signOut = document.createElement("span");
//     signOut.textContent = "Sign Out";
//     signOut.style.color = "Red";
//     signOut.style.fontWeight = "bold";
//     signOut.style.cursor = "pointer";
//     signOut.style.position = "absolute";
//     signOut.style.bottom = "-1.5em";
//     signOut.style.left = "1em";
//     signOut.addEventListener("click", () => {
//       signup.innerHTML = "Sign Up";
//       signup.addEventListener("click", () => {
//         window.location.href = "signup.html";
//       });
//     });
//     signup.appendChild(signOut);
//   });
//   signup.innerHTML = username;
// }
// Utility function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
const actress = document.querySelector("div.actress");
const tvId = getQueryParam("id");
const detailsContainer = document.getElementById("detailsContainer");

if (tvId) {
  // Fetch TV series details
  fetch(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`, options)
    .then((res) => res.json())
    .then((tv) => {
      const posterPath = tv.poster_path
        ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
      console.log(tv);

      const html = `
          <div class="col-md-4">
            <img src="${posterPath}" class="img-fluid" alt="${tv.name}" />
          </div>

          <div class="col-md-8">
            <h2>${tv.name}</h2>
                        <p><strong class="text-white">Genre:</strong> ${tv.genres
                          .map((extract) => extract.name)
                          .join(", ")}</p>
            <p><strong class="text-white">First Air Date:</strong> ${
              tv.first_air_date || "N/A"
            }</p>
            <p><strong class="text-white">Rating:</strong> ${
              tv.vote_average || "N/A"
            } / 10</p>
            <p><strong class="text-white">Overview:</strong></p>
            <p>${tv.overview || "No overview available."}</p>
          </div>
        `;
      detailsContainer.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      detailsContainer.innerHTML = "<p>Error loading TV series details.</p>";
    });
  fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/credits?language=en-US`,
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
} else {
  detailsContainer.innerHTML = "<p>No TV series ID provided.</p>";
}
