export const fetchDrinksIngredient = async (ingredient: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  const data = response.json();
  return data;
};

export const fetchdDrinksName = async (name: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
  );
  const data = response.json();
  return data;
};

export const fetchDrinksFirstLetter = async (firstLetter: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`,
  );
  const data = response.json();
  return data;
};
