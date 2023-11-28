export const fetchMealsIngredient = async (ingredient: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = response.json();
    return await data;
  } catch (error) {
    console.log('Erro busca por name', error);
  }
};

export const fetchMealsname = async (name: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = response.json();
    return await data;
  } catch (error) {
    console.log('Erro busca por name', error);
  }
};

export const fetchMealsfirstLetter = async (firstLetter: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = response.json();
    return await data;
  } catch (error) {
    console.log('Erro busca por first letter', error);
  }
};

export const fetchMealsDetails = async (id: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = response.json();
  return data;
};
