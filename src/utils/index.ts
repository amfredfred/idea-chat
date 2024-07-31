export const promise = (seconds: number = 3) => new Promise((resolved) => setTimeout(resolved, seconds * 1000))
export const parseEther = (amount: number, decimals: number) => amount / 10 ** decimals;
export const parseAmount = (amount: number, decimals: number) => amount * 10 ** decimals;