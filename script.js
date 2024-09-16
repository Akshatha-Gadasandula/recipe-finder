const APP_ID = '8ed9c70e'; 
const APP_KEY = 'a77681a4f57fe60ab78c63674eeb7ac8'; 
const recipeContainer = document.getElementById('recipe-container');


function searchRecipes() {
  const query = document.getElementById('recipe-search').value;
  const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayRecipes(data.hits))
    .catch(error => console.error('Error fetching recipes:', error));
}


function displayRecipes(recipes) {
  recipeContainer.innerHTML = ''; 

  recipes.forEach(recipeData => {
    const recipe = recipeData.recipe;

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.label}">
      <h3>${recipe.label}</h3>
      <div class="recipe-details">
        <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <a href="${recipe.url}" target="_blank">View full recipe</a>
      </div>
    `;

    recipeContainer.appendChild(recipeCard);
  });
}
