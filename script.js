require('dotenv').config();
const apiKey = process.env.API_KEY;

async function searchRecipes(query) {
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    displayResults(data.results);
  } catch (error) {
    console.log('Error fetching recipes:', error);
  }
}

function displayResults(results) {
  const recipeResultsContainer = document.getElementById('recipe-results');
  
  recipeResultsContainer.innerHTML = '';

  if (results.length === 0) {
    recipeResultsContainer.innerHTML = '<p>No results found.</p>';
  } else {
    results.forEach(result => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      
      const title = document.createElement('h3');
      title.textContent = result.title;
      
      const image = document.createElement('img');
      image.src = result.image;
      image.alt = result.title;
      
      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      
      recipeResultsContainer.appendChild(recipeCard);
    });
  }
}

function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();
  
  if (searchQuery) {
    searchRecipes(searchQuery);
  }
}

const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', handleSearch);
