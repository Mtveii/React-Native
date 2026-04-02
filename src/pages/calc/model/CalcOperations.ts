export const CalcOperations = {
  add: "add",
  sub: "sub",
  div: "div",
  mul: "mul"
} as const;

export type CalcOperations = 
  typeof CalcOperations[keyof typeof CalcOperations];