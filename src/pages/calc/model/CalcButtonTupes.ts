export const CalcButtonTypes = {
    digit: "digit",
    fanc: "fanc",
    equal: "equal"
} as const;

export type CalcButtonTypes = typeof CalcButtonTypes[keyof typeof CalcButtonTypes];