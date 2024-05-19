// AFTER GIVEN MS , THE RESOLVE FUNCTION IS CALLED AND THE PROMISE IS RESOLVED
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
