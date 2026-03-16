import { getNextWeek } from "../utils/date.js";
import { createPlannerCards } from "./planner-dom.js";
import { setupPlannerEvents } from "./planner-events.js";
import { loadStoredMeals } from "../meals/meals.js";
import { addDropZoneListeners } from "../meals/drag-drop.js";

export function initPlanner() {

  const week = getNextWeek();

  createPlannerCards(week);

  loadStoredMeals();

  setupPlannerEvents();

  addDropZoneListeners();

}