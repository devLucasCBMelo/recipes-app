type RecipeTitleProps = {
  classNameTitle: string;
  classNameDiv: string;
  testId: string;
  name: string;
};

export default function RecipeTitle({
  classNameTitle, testId, name, classNameDiv }: RecipeTitleProps) {
  return (
    <div className={ classNameDiv }>
      <h3
        className={ classNameTitle }
        data-testid={ testId }
      >
        { name }
      </h3>
    </div>
  );
}
