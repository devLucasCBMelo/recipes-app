export const fetchMealsIngredient = async (ingredient: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = response.json();
  return data;
};

export const fetchMealsRecommendation = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = response.json();
  return data;
};

export const fetchMealsname = async (name: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = response.json();
  return data;
};

export const fetchMealsfirstLetter = async (firstLetter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = response.json();
  return data;
};

export const fetchMealsDetails = async (id: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];

      meal.ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
          meal.ingredients.push(`${ingredient} - ${measure}`);
        }
      }

      return { meals: [meal] };
    }
    return { meals: [] };
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return { meals: [] };
  }
};
