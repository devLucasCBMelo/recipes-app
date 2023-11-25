export const fetchMealsIngredient = async (ingredient: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = response.json();
  return data;
};

export const fetchMealsname = async (name: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = response.json();
  return data;
};

export const fetchMealsfirstLetter = async (firstLetter: string) => {
  const response = await fetch(` https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = response.json();
  return data;
};
