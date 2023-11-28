// esse componente será usado para criar botões interativos
// como o de favoritar e compartilhar receitas
// ele devera receber como props o tipo de botão que será renderizado
// podendo ser de compartilhar ou favoritar ou ambos;

type InteractiveBtnProps = {
  srcShare?: string;
  srcFavorite?: string;
  dataShare?: string;
  dataFavorite?: string;
  favorite?: boolean;
};

export default function InteractiveBtn({ srcShare,
  srcFavorite, dataShare, dataFavorite, favorite }: InteractiveBtnProps = {}) {
  return (
    <>
      { srcShare && (

        <button type="button">
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
