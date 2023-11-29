// esse componente será usado para criar botões interativos
// como o de favoritar e compartilhar receitas
// ele devera receber como props o tipo de botão que será renderizado
// podendo ser de compartilhar ou favoritar ou ambos;

import { useContext } from 'react';
import searchBarContext from '../../contex/SearchBarContex';

type InteractiveBtnProps = {
  srcShare?: string;
  srcFavorite?: string;
  dataShare?: string;
  dataFavorite?: string;
  favorite?: boolean;
  id?: string;
  type?: string;
};

export default function InteractiveBtn({
  srcShare,
  srcFavorite,
  dataShare,
  dataFavorite,
  favorite,
  id,
  type,
}: InteractiveBtnProps = {}) {
  const { setShowAlert } = useContext(searchBarContext);

  // if (showAlert) {
  //   window.alert('Link copied!');
  // }

  const handleShare = (ID: string, TYPE: string) => {
    // quando chamada, essa função deverá copiar a url da tela de detalhes da receita clicada
    // para o clipboard do usuário
    // a url deve ser: http://localhost:3000/drinks/${id}/in-progress` caso a receita seja de bebida
    // ou http://localhost:3000/meals/${id}/in-progress` caso a receita seja de comida
    // o texto do alert deve ser "Link copied!" caso a cópia da url seja realizada com sucesso
    // o alert deve ter no máximo 3 segundos de duração
    const { hostname, port } = window.location;
    if (TYPE === 'meal') {
      navigator.clipboard.writeText(`http://${hostname}:${port}/meals/${ID}/in-progress`);
      setShowAlert(true);
      setTimeout(
        () => {
          setShowAlert(false);
        },
        5000,
      );
    } else {
      navigator.clipboard.writeText(`http://${hostname}:${port}/drinks/${ID}/in-progress`);
      setShowAlert(true);
      setTimeout(
        () => {
          setShowAlert(false);
        },
        5000,
      );
    }
  };

  return (
    <>
      { srcShare && (

        <button
          type="button"
          onClick={ () => handleShare(id as string, type as string) }
        >
          <img
            src={ srcShare }
            alt="share icon"
            data-testid={ dataShare }
          />
        </button>
      )}
      { srcFavorite && (

        <button type="button">
          <img
            src={ srcFavorite }
            alt={ `Heart ${favorite ? 'Black' : 'White'} Favorite icon` }
            data-testid={ dataFavorite }
          />
        </button>
      )}
    </>
  );
}
