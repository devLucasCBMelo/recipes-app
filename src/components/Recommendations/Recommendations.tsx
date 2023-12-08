import { useEffect, useState } from 'react';
import { fetchDrinksRecommendation } from '../../utils/fetchDrinksApi';
import { fetchMealsRecommendation } from '../../utils/fetchMealsApi';
import { Recipe } from '../../type';

import './recommendations.css';

interface RecommendationsProps {
  recommendationType: 'Meal' | 'Drink';
}

function Recommendations({ recommendationType }: RecommendationsProps) {
  const [recommendation, setRecommendation] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const getRecommendations = async () => {
      let recommendations;

      if (recommendationType === 'Drink') {
        const result = await fetchDrinksRecommendation();
        recommendations = result.drinks;
      } else {
        const result = await fetchMealsRecommendation();
        recommendations = result.meals;
      }

      if (recommendations) {
        const shortRecommendations = recommendations.slice(0, 6);
        setRecommendation(shortRecommendations);
      }
    };
    getRecommendations();
    setLoading(false);
  }, [recommendationType]);

  return (
    <div className="carrousel">
      {loading && <h1>Carregando...</h1>}
      {!loading && recommendation.map((recipe: Recipe, index: number) => {
        return (
          <div
            className="carrousel__item"
            key={ recipe[`id${recommendationType}`] }
            data-testid={ `${index}-recommendation-card` }
          >
            <h2
              className="title__carrousel"
              data-testid={ `${index}-recommendation-title` }
            >
              {recipe[`str${recommendationType}`]}
            </h2>
            <img
              className="img__carrousel"
              src={ recipe[`str${recommendationType}Thumb`] }
              alt={ recipe[`str${recommendationType}`] }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Recommendations;
