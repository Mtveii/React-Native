export const CalcButtonTypes = {
  digit: "digit",
  func:  "func",
  equal: "equal"
} as const;

export type CalcButtonTypes = typeof CalcButtonTypes[keyof typeof CalcButtonTypes];