import classes from "./meals.grid.module.css";
import MealItem from "./meal-item";

type mealItemProps = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
};
type mealsProps = mealItemProps[] | unknown[];

export default function MealsGrid({ meals }: { meals: mealsProps }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: any) => {
        return (
          <li key={meal.key}>
            <MealItem {...meal} />
          </li>
        );
      })}
    </ul>
  );
}
