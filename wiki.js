
let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


let toggleThemeBtn = document.getElementById("toggleThemeBtn");
let bodyEl = document.body;
let toggleThemeText = document.getElementById("toggleThemeText");
let themeIcon = document.getElementById("themeIcon");

// Function to toggle between light and dark themes
function toggleTheme() {
  bodyEl.classList.toggle("dark-theme");
  toggleThemeBtn.textContent = bodyEl.classList.contains("dark-theme") ? "Light Mode" : "Dark Mode";
  }

// Event listener for the theme toggle button
toggleThemeBtn.addEventListener("click", toggleTheme);


function createAndAppendSearchResult(result) {
  let { link, title, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  let linkBreakEl = document.createElement("br");
  resultItemEl.appendChild(linkBreakEl);

  let descriptionEl = document.createElement("p");
  descriptionEl.id = "contentParagraph";
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
  spinnerEl.classList.add("d-none");


  if (searchResults.length === 0) {
    let noResultsEl = document.createElement("p");
    noResultsEl.classList.add("no-results");
    noResultsEl.textContent = "No results found.";
    searchResultsEl.appendChild(noResultsEl);
  } else {
    for (let result of searchResults) {
      createAndAppendSearchResult(result);
    }
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";
    

    let searchInput = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
    let options = {
      method: "GET",
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        displayResults(search_results);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }
}

searchInputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      
    }
  });
  
  searchInputEl.addEventListener("input", function () {
    if (searchInputEl.value === "") {
      searchResultsEl.textContent = "";
    }
  });

searchInputEl.addEventListener("keydown", searchWikipedia);
