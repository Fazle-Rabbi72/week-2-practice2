const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const foodContainer = document.querySelector('.food-container');
const recipeDetailscontant = document.querySelector('.recipe-details-contant');
const recipeCloseBtn = document.querySelector('.recipe-close-btn'); // Corrected typo

const fetchFood = async (query) => {
    foodContainer.innerHTML = "<h2>Searching Food Items...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    foodContainer.innerHTML = "";
    
    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipiePopup(meal);
            });

            foodContainer.appendChild(recipeDiv);
        });
    }
    else {
        foodContainer.innerHTML = "<h2>No food items found</h2>";
    }
}

const openRecipiePopup = (meal) => {
    // Create the ingredient list
    let ingredientsList = '<ul>';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    ingredientsList += '</ul>';

    // Set the popup content
    recipeDetailscontant.innerHTML = `
        <button class="recipe-close-btn" onclick="closeRecipePopup()">Close</button>
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Ingredients</h3>
        ${ingredientsList}
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;
    recipeDetailscontant.parentElement.style.display = 'block'; // Show the popup
}

const closeRecipePopup = () => {
    recipeDetailscontant.parentElement.style.display = 'none'; // Hide the popup
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        foodContainer.innerHTML = "<h2>Please Type Food Item on the Search Box!</h2>";
        return;
    }
    fetchFood(searchInput);
});
