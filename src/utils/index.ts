import { MutableRefObject } from "react";

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

export const getDimensions = (ref: MutableRefObject<HTMLElement | null>) => {
    if (ref.current) {
        const { offsetWidth: width, offsetHeight: height } = ref.current;
        return { width, height };
    }
    return { width: 0, height: 0 };
};

export const checkOverlap = (rect1: DOMRect, rect2: DOMRect): boolean => {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
};