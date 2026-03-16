import { createMealComponent } from "./meal-component.js";
import { saveMeal, getStoredMeals, deleteMealFromStorage } from "../storage/meals-storage.js";

export function addMeal(container) {

  const recipe = prompt("Añade la receta");

  if (!recipe) return;

  const dayContainer = container.closest(".week-planner__day");

  const mealData = {
    id: crypto.randomUUID(),
    recipe,
    day: dayContainer.dataset.date,
    meal: container.dataset.meal
  };

  const mealElement = createMealComponent(
    mealData.recipe,
    mealData.day,
    mealData.meal,
    mealData.id
  );

  container.append(mealElement);

  saveMeal(mealData);
}

export function deleteMeal(event) {

  const dish = event.target.closest(".meal__container");

  deleteMealFromStorage(dish.dataset.id);

  dish.remove();
}

export function loadStoredMeals() {

  const meals = getStoredMeals();

  meals.forEach(({ id, recipe, day, meal }) => {

    const dayEl = document.querySelector(
      `.week-planner__day[data-date="${day}"]`
    );

    if (!dayEl) return;

    const mealEl = dayEl.querySelector(
      `.meals__container[data-meal="${meal}"]`
    );

    if (!mealEl) return;

    const mealElement = createMealComponent(recipe, day, meal, id);

    mealEl.append(mealElement);

  });

}