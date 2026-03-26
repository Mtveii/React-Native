export {};

declare global {
    interface Number {
        pad0(): string, 
    }
}

Number.prototype.pad0 = function():string {
    const v = this.valueOf();
    let pad = v < 10 && v >= 0 ? "" : "";
    return pad + v
}