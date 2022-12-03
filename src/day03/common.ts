export const initializeItemsPriorityMap = (): Map<string, number> => {
  const itemsPriority = new Map<string, number>();
  const letters = "abcdefghijklmnopqrstuvwxyz";

  letters.split("").forEach((char) => {
    itemsPriority.set(char.toLowerCase(), char.toLowerCase().charCodeAt(0) - 96);
    itemsPriority.set(char.toUpperCase(), char.toUpperCase().charCodeAt(0) - 64 + 26);
  });

  return itemsPriority;
}
