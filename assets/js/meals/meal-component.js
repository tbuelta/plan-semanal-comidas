export function createMealComponent(text, day, meal, id) {

  const dish = document.createElement("div");

  dish.className = "meal__container draggable";

  dish.draggable = true;

  dish.dataset.id = id;
  dish.dataset.day = day;
  dish.dataset.meal = meal;

  dish.innerHTML = `
    <p>${text}</p>
    <i class="meal__delete fa-solid fa-trash"></i>
  `;

  dish.addEventListener("dragstart", (event) => {
    dish.classList.add("dragging");
    event.dataTransfer.setData("text/plain", id);
  });

  dish.addEventListener("dragend", () => {
    dish.classList.remove("dragging");
  });

  return dish;

}