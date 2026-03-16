// Save in localStorage
export function getStoredMeals() {
  return JSON.parse(localStorage.getItem("weekMeals")) || [];
}

export function saveMeal(mealObj) {
  const meals = getStoredMeals();
  meals.push(mealObj);
  localStorage.setItem("weekMeals", JSON.stringify(meals));
}

// Remove from localStorage
export function deleteMealFromStorage(id) {
  const meals = getStoredMeals();
  const updatedMeals = meals.filter(m => m.id !== id);
  localStorage.setItem("weekMeals", JSON.stringify(updatedMeals));
}

// Update meal after drag & drop
export function updateMeal(id, newDay, newMeal) {
  const meals = getStoredMeals();

  const index = meals.findIndex(meal => meal.id === id);
  if (index === -1) return;

  meals[index].day = newDay;
  meals[index].meal = newMeal;

  // ⚡ Guardar en la misma clave "weekMeals"
  localStorage.setItem("weekMeals", JSON.stringify(meals));
}