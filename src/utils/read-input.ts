import { createReadStream } from "fs";
import { createInterface } from "readline";

export const readInput = async (path: string) => {
  const fileStream = createReadStream(path);
  const readLine = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const list: string[] = [];

  for await (const line of readLine) {
    list.push(line);
  }

  return list;
}