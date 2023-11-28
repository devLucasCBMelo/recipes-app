export const fetchDrinksIngredient = async (ingredient: string) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro busca por ingredient', error);
  }
};

export const fetchDrinksName = async (name: string) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro busca por name', error);
  }
};

export const fetchDrinksFirstLetter = async (firstLetter: string) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro busca por first letter', error);
  }
};

export const fetchdDrinksDetails = async (id: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = response.json();
  return data;
};
