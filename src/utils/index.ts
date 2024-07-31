export const promise = (seconds: number = 3) => new Promise((resolved) => setTimeout(resolved, seconds * 1000))
export const parseEther = (amount: number, decimals: number) => amount / 10 ** decimals;
export const parseAmount = (amount: number, decimals: number) => amount * 10 ** decimals;


export function shortenString(str: string, maxLength: number = 10, mode: 'left' | 'center' | 'right' = 'center'): string {
    if (str.length <= maxLength) {
        return str;
    }

    const ellipsis = '...';
    const ellipsisLength = ellipsis.length;

    switch (mode) {
        case 'left':
            return ellipsis + str.slice(-maxLength + ellipsisLength);
        case 'center': {
            const halfLength = Math.floor((maxLength - ellipsisLength) / 2);
            return str.slice(0, halfLength) + ellipsis + str.slice(-halfLength);
        } case 'right':
        default:
            return str.slice(0, maxLength - ellipsisLength) + ellipsis;
    }
}