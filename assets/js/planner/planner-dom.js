import { MEALS } from "../config/constants.js";

const weekPlanner = document.querySelector(".week-planner");

export function createPlannerCards(week) {

  weekPlanner.innerHTML = week.map(day => `
    <article class="week-planner__day" data-date="${day.formattedDate}">
      <header class="day__header">
        <h2 class="day__title">${day.dayName}</h2>
        <p class="day__date">${day.formattedDate}</p>
      </header>

      <div class="day__meals">
        ${MEALS.map(meal => `
          <div class="meals__container drop-zone meals__${meal.en}" data-meal="${meal.en}">
            <h3 class="meals__title">${meal.es}</h3>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");

}