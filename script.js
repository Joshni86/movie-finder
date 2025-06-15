const search_input = document.querySelector("#searchInput");
// Since the HTML input has id="searchInput" - In JavaScript, we can use #id to interact with the input, in this case it's #searchInput. the method in JavaScript is document.querySelector('#searchInput')
const search_button = document.querySelector("#searchButton");
const search_results = document.querySelector("#results");

search_button.addEventListener("click", async () => {
  const searchTerm = search_input.value.trim();
  if (searchTerm) {
    searchMovies(searchTerm);
  }
});

const apiKey = "fa356ff5";
const resultsContainer = document.querySelector("#results");
function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
    query
  )}&apikey=${apiKey}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayMovies(data.Search);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      search_results.innerHTML =
        "<p>Error fetching data. Please try again.</p>";
    });
}

function displayMovies(movies) {
  if (!movies) {
    resultsContainer.innerHTML =
      "<p class='text-gray-500'>No results found.</p>";
    return;
  }
  resultsContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "bg-white rounded-lg shadow-md p-4 m-2";
    movieCard.innerHTML = `<h2 class="text-xl font-semibold">${
      movie.Title
    }</h2> <p><strong>Year:</strong> ${movie.Year}</p> <img src="${
      movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"
    }" alt="Poster for ${movie.Title}" class="mt-2 max-w-xs"> `;
    resultsContainer.appendChild(movieCard);
  });
}
