export const fetchDrinksIngredient = async (ingredient: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  const data = response.json();
  return data;
};

export const fetchDrinksRecommendation = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const data = response.json();
  return data;
};

export const fetchDrinksName = async (name: string) => {
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

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
export const fetchdDrinksDetails = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}lookup.php?i=${id}`);
    const data = await response.json();

    // console.log('Drinks', data);

    if (data.drinks && data.drinks.length > 0) {
      const drink = data.drinks[0];
      const ingredients = [];

      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (ingredient && measure) {
          ingredients.push(`${ingredient} - ${measure}`);
        } else if (ingredient) {
          ingredients.push(ingredient);
        }
      }

      drink.ingredients = ingredients;

      drink.containsAlcoholic = drink.strAlcoholic === 'Alcoholic';
    }

    return data;
  } catch (error) {
    console.error('Error fetching drink details:', error);
    return {};
  }
};
