export const chunkArray = <T>(input: any[], chunkSize: number): T[] => {
  const chunked: T[] = [];

  for (let i = 0; i < input.length; i += chunkSize) {
    chunked.push(input.slice(i, i + chunkSize) as T);
  }

  return chunked;
}
