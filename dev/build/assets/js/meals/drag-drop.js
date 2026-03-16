import { updateMeal } from "../storage/meals-storage.js";

export function addDropZoneListeners() {

  const dropZones = document.querySelectorAll(".drop-zone");

  dropZones.forEach(zone => {

    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("over");
    });

    zone.addEventListener("drop", (event) => {

      event.preventDefault();

      zone.classList.remove("over");

      const id = event.dataTransfer.getData("text/plain");

      const dish = document.querySelector(
        `.meal__container[data-id='${id}']`
      );

      if (!dish) return;

      zone.appendChild(dish);

      const newDay = zone.closest(".week-planner__day").dataset.date;
      const newMeal = zone.dataset.meal;

      dish.dataset.day = newDay;
      dish.dataset.meal = newMeal;

      updateMeal(id, newDay, newMeal); // ← storage update
    });

  });

}