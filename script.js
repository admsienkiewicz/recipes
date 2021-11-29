const searchBox = document.getElementById("search-content");
const searchButton = document.getElementById("search-button");
const resultsDiv = document.getElementById("results");

const getRecipieByName = async (name) => {
  const response = await fetch(
    `https://themealdb.p.rapidapi.com/search.php?s=${name}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "themealdb.p.rapidapi.com",
        "x-rapidapi-key": "c5017548c6msh80dc9838118b7b4p1317ecjsn8ec295267c0e",
      },
    }
  );
  return response.json();
};

const searchByName = async () => {
  const result = await getRecipieByName(searchBox.value);
  const meals = result["meals"];
  console.log(result)
  for (let i = 0; i < [...meals].length; i++) {
    createResultDiv(
      meals[i]["strMeal"],
      meals[i]["strMealThumb"],
      meals[i]["strInstructions"]
    );
  }
};

searchButton.addEventListener("click", searchByName);

const createResultDiv = async (meal, img, recipe) => {
  const mealName = document.createElement("h3");
  const nameDiv = document.createElement("div");
  const mealCard = document.createElement("div");
  const resultDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const mealImg = document.createElement("img");
  const buttonDiv = document.createElement("div");
  const recipeButton = document.createElement("button");
  const flipInner = document.createElement("div");
  const top = document.createElement("div");
  const bottom = document.createElement("div");

  flipInner.classList.add("flip-card-inner");
  top.classList.add("top");
  bottom.classList.add("bottom");
  resultDiv.classList.add("col-lg-4", "col-md-6", "col-sm-12", "result");
  mealCard.classList.add("meal-card");
  bottom.textContent = recipe;

  nameDiv.classList.add("meal-name");
  mealName.textContent = meal;
  mealImg.src = img;
  mealImg.classList.add("food-picture");
  buttonDiv.classList.add("recipe-button-box");
  recipeButton.classList.add("btn", "btn-secondary");
  recipeButton.textContent = "View recipe";

  nameDiv.append(mealName);
  imgDiv.append(mealImg);
  buttonDiv.append(recipeButton);
  top.append(nameDiv);
  top.append(imgDiv);
  top.append(buttonDiv);
  mealCard.append(flipInner);
  flipInner.append(top);
  flipInner.append(bottom);
  resultDiv.append(mealCard);
  resultsDiv.append(resultDiv);

  recipeButton.addEventListener("click", () => {
      mealCard.classList.add("meal-card-flip")
  })
};
