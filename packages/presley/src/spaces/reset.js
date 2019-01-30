export const RESET = '__GLOBAL_RESET__';

export function reset() {
  return { type: RESET };
}
