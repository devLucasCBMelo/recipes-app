// esse componente será usado para criar botões interativos
// como o de favoritar e compartilhar receitas
// ele devera receber como props o tipo de botão que será renderizado
// podendo ser de compartilhar ou favoritar ou ambos;

import { useContext } from 'react';
import searchBarContext from '../../contex/SearchBarContex';
import { RecipeType } from '../../type';
import heartBlack from '../../images/blackHeartIcon.svg';
import heartWhite from '../../images/whiteHeartIcon.svg';
import share from '../../images/shareIcon.svg';
import { deleteLocalStorage, putLocalStorage } from '../../utils/localStorage';
import styles from './InteractiveBtn.module.css';

type InteractiveBtnProps = {
  srcShare?: typeof heartBlack | typeof heartWhite;
  srcFavorite?: typeof share;
  dataShare?: string;
  dataFavorite?: string;
  id?: string;
  type?: string;
  recipe?: RecipeType;
  handleIdLink?: (idLink: string, typeLink: string) => void;
};

export default function InteractiveBtn({
  srcShare,
  srcFavorite,
  dataShare,
  dataFavorite,
  id,
  type,
  recipe,
  handleIdLink,
}: InteractiveBtnProps = {}) {
  const { setShowAlert, setFavorites } = useContext(searchBarContext);

  // if (showAlert) {
  //   window.alert('Link copied!');
  // }

  const handleShare = (ID: string, TYPE: string) => {
    // quando chamada, essa função deverá copiar a url da tela de detalhes da receita clicada
    // para o clipboard do usuário
    // a url deve ser: http://localhost:3000/drinks/${id}` caso a receita seja de bebida
    // ou http://localhost:3000/meals/${id}` caso a receita seja de comida
    // o texto do alert deve ser "Link copied!" caso a cópia da url seja realizada com sucesso
    // o alert deve ter no máximo 5 segundos de duração
    if (TYPE === 'meal') {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${ID}`);
      setShowAlert(true);
      if (handleIdLink) handleIdLink(ID, TYPE);
      setTimeout(
        () => {
          setShowAlert(false);
        },
        3000,
      );
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${ID}`);
      setShowAlert(true);
      if (handleIdLink) handleIdLink(ID, TYPE);
      setTimeout(
        () => {
          setShowAlert(false);
        },
        3000,
      );
    }
  };

  const handleFavorite = (RECIPE: RecipeType, ID: string) => {
    // quando chamada, essa função deverá adicionar ou remover a receita do localStorage
    // mas primeiro deve verificar se o botão clicado é um coração preto = desfavoritar
    // ou um coração branco = favoritar
    // caso seja um coração preto, isso quer dizer que a receita foi favoritada
    // e deve ser removida do localStorage
    // caso seja um coração branco, isso quer dizer que a receita não foi favoritada
    // e deve ser adicionada ao localStorage
    // para isso ela deve receber como parâmetro a RECIPE e o ID
    // RECIPE é a receita que será adicionada no localStorage
    // ID é o id da receita que será removida do localStorage
    // ambos parâmetros são recebidos via props quando o componente é renderizado
    // e passados para a função por parâmetros
    if (srcFavorite === heartBlack) {
      deleteLocalStorage('favoriteRecipes', ID);
      setFavorites((prev) => prev.filter((item) => item.id !== ID));
    } else {
      putLocalStorage('favoriteRecipes', RECIPE);
      setFavorites((prev) => [...prev, RECIPE]);
    }
  };

  return (
    <div className={ styles.container_buttons }>
      { srcShare && (

        <button
          type="button"
          onClick={ () => handleShare(id as string, type as string) }
        >
          <img
            src={ srcShare }
            alt="Favorite button share icon"
            data-testid={ dataShare }
          />
        </button>
      )}
      { srcFavorite && (

        <button
          type="button"
          onClick={ () => handleFavorite(recipe as RecipeType, id as string) }
        >
          <img
            src={ srcFavorite }
            alt={ `Favorite button ${srcFavorite === heartBlack
              ? 'black' : 'white'} heart icon` }
            data-testid={ dataFavorite }
          />
        </button>
      )}
    </div>
  );
}
