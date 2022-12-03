import { readInput } from "../../utils/read-input";

(async () => {
  const caloriesListRaw = await readInput("./src/day01/input.txt");
  const caloriesList = caloriesListRaw.map((value) => parseInt(value, 10))
  
  let maxCalories = 0;
  let currentElfCalories = 0;

  for (const calories of caloriesList) {
    if (Number.isNaN(calories)) {
      maxCalories = Math.max(currentElfCalories, maxCalories);
      currentElfCalories = 0;

      continue;
    }

    currentElfCalories += calories;
  }

  const answer = Math.max(currentElfCalories, maxCalories);

  console.log(answer);
})();