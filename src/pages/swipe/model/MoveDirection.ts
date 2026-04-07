export const MoveDirection = {
    left:  "left",
    right: "right",
    up:    "up",
    down:  "down",
  } as const;
  
  export type MoveDirection = 
    typeof MoveDirection[keyof typeof MoveDirection];
  