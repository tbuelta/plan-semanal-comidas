import { addMeal, deleteMeal } from "../meals/meals.js";

export function setupPlannerEvents() {

  const planner = document.querySelector(".week-planner");

  planner.addEventListener("click", (event) => {

    const mealContainer = event.target.closest(".meals__container");

    if (!mealContainer) return;

    if (event.target.classList.contains("meal__delete")) {
      deleteMeal(event);
      return;
    }

    addMeal(mealContainer);

  });

}