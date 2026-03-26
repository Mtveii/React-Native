export {};

declare global {
  interface Date {
    toDotted(): string;
  }
}

Date.prototype.toDotted = function():string {

    return `${this.getDate().pad0()}.${(this.getMonth() + 1).pad0()}.${this.getFullYear()}`;
}