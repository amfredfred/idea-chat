export const promise = (seconds: number = 3) => new Promise((resolved) => setTimeout(resolved, seconds * 1000))