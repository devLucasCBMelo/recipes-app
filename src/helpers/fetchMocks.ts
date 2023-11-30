import mockMealsCategories from './mockMealsCategories';
import mockDrinksCategories from './mockDrinksCategories';
import mockDrinksData from './mockDrinksData';
import mockMealsData from './mockMealsData';
import mockBeefsData from './mockBeefsData';
import mockCocktailData from './mockCocktailData';

const POSSIBLE_RESPONSE: any = {
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': mockMealsCategories,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': mockDrinksCategories,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': mockMealsData,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': mockDrinksData,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': mockBeefsData,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail': mockCocktailData,
};

const fetchMock = (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => (POSSIBLE_RESPONSE[url] ? POSSIBLE_RESPONSE[url] : mockMealsData),
});

export default fetchMock;
