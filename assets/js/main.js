//Generate cards
const weekPlanner = document.querySelector(".week-planner");
const DAYS_ES = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const MEALS = [
  { es: "Desayuno", en: "breakfast" },
  { es: "Almuerzo", en: "brunch" },
  { es: "Comida", en: "lunch" },
  { es: "Merienda", en: "snack" },
  { es: "Cena", en: "dinner" }
];

function loadStoredMeals() {
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

    createRecipe(recipe, mealEl, day, meal, id);
  });
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

function getNextWeek() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    return {
      date,
      dayName: DAYS_ES[date.getDay()],
      formattedDate: formatDate(date)
    };
  });
};

function createPlannerCards(week) {

  weekPlanner.innerHTML = week.map(day => `
    <article class="week-planner__day" data-date="${day.formattedDate}">
      <header class="day__header">
        <h2 class="day__title">${day.dayName}</h2>
        <p class="day__date">${day.formattedDate}</p>
      </header>
      <div class="day__meals">
        ${MEALS.map(meal => `
          <div class="meals__container meals__${meal.en}" data-meal="${meal.en}">
            <h3 class="meals__title">${meal.es}</h3>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
};


//Add meals
// 🎯 Event delegation
weekPlanner.addEventListener("click", (event) => {
  const mealContainer = event.target.closest(".meals__container");
  if (!mealContainer) return;

  // Si se pulsa el botón eliminar
  if (event.target.classList.contains("meal__delete")) {
    event.stopPropagation();

    const dish = event.target.closest(".meal__container");
    
    deleteMealFromStorage(dish.dataset.id);
    dish.remove();
    return;
  }

  const recipe = prompt("Añade la receta");
  if (!recipe) return;

  const dayContainer = mealContainer.closest(".week-planner__day");

  const mealData = {
    id: crypto.randomUUID(),
    recipe,
    day: dayContainer.dataset.date,
    meal: mealContainer.dataset.meal
  };

  createRecipe(
    mealData.recipe, 
    mealContainer,
    mealData.day,
    mealData.meal,
    mealData.id
  );
  saveMeal(mealData);
  
});

function createRecipe(text, container, day, meal, id) {
  const dish = document.createElement("div");
  dish.className = "meal__container";

  dish.dataset.id = id;
  dish.dataset.day = day;
  dish.dataset.meal = meal;

  dish.innerHTML = `
    <p>${text}</p>
    <i class="meal__delete fa-solid fa-trash"></i>
  `;

  container.append(dish);
};

//Save in localStorage
function getStoredMeals() {
  return JSON.parse(localStorage.getItem("weekMeals")) || [];
};

function saveMeal(mealObj) {
  const meals = getStoredMeals();
  meals.push(mealObj);
  localStorage.setItem("weekMeals", JSON.stringify(meals));
};

//Remove in localStorage
function deleteMealFromStorage(id) {
  const meals = getStoredMeals();
  const updatedMeals = meals.filter(m => m.id !== id);
  localStorage.setItem("weekMeals", JSON.stringify(updatedMeals));
};

// 🚀 run
createPlannerCards(getNextWeek());
loadStoredMeals();