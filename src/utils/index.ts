import { MutableRefObject } from "react";
import { PumpTokenItem } from "../common/types";
import { formatNumber } from "./format";
import BigNumber from 'bignumber.js';

export const promise = (seconds: number = 3) => new Promise((resolved) => setTimeout(resolved, seconds * 1000))

export const parseEther = (amount: number | string, decimals: number): number => {
    const bnAmount = new BigNumber(amount);
    const divisor = Math.pow(10, decimals);
    const result = bnAmount.dividedBy(divisor);
    const truncatedResult = result.toFixed(8); // Truncate beyond 8 decimal places
    return parseFloat(truncatedResult);
};

export const parseAmount = (amount: number, decimals: number): string => {
    const bnAmount = new BigNumber(amount);
    return bnAmount.multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0);
};

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


export function calculatePercentageChange(currentPrice: number, pastPrice: number | null): number {
    if (pastPrice === null || pastPrice === 0) {
        return 0;
    }
    return ((currentPrice - pastPrice) / pastPrice) * 100;
}

export function calculatePumpTokenChanges(token: PumpTokenItem): { change5m: string, change1h: string, change6h: string, change24h: string } {
    const change5m = formatNumber(calculatePercentageChange(token.price, token.price_5m));
    const change1h = formatNumber(calculatePercentageChange(token.price, token.price_1h));
    const change6h = formatNumber(calculatePercentageChange(token.price, token.price_6h));
    const change24h = formatNumber(calculatePercentageChange(token.price, token.price_24h));

    return { change5m, change1h, change6h, change24h };
}