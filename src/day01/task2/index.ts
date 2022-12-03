import { readInput } from "../../utils/read-input";

(async () => {
  const caloriesListRaw = await readInput("./src/day01/input.txt");
  const caloriesList = caloriesListRaw.map((value) => parseInt(value, 10))
  
  let elfCaloriesList: number[] = [];
  let currentElfCalories = 0;

  for (const calories of caloriesList) {
    if (Number.isNaN(calories)) {
      elfCaloriesList.push(currentElfCalories);
      currentElfCalories = 0;

      continue;
    }

    currentElfCalories += calories;
  }

  elfCaloriesList.push(currentElfCalories);

  elfCaloriesList.sort((a, b) => b - a);

  const answer = elfCaloriesList[0] + elfCaloriesList[1] + elfCaloriesList[2];

  console.log(answer);
})();