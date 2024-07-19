import { useState, useEffect } from 'react';

type IStorageKeys = '_usertoken'

const decodeItem = <T>(item: string | null, initialValue: T): T => {
    if (item === null) {
        return initialValue;
    }
    try {
        const decoded = atob(item);
        return JSON.parse(decoded) as T;
    } catch (error) {
        console.error('Failed to decode or parse item from localStorage', error);
        return initialValue;
    }
};

const encodeItem = <T>(value: T, initialValue: T): string => {
    try {
        const stringified = JSON.stringify(value);
        return btoa(stringified);
    } catch (error) {
        console.error('Failed to stringify or encode item to localStorage', error);
        return btoa(JSON.stringify(initialValue));
    }
};

export const getItem = <T>(key: IStorageKeys, initialValue: T): T => {
    const item = localStorage.getItem(key);
    return decodeItem(item, initialValue);
};

export const setItem = <T>(key: IStorageKeys, value: T, initialValue: T): void => {
    try {
        const encodedValue = encodeItem(value, initialValue);
        localStorage.setItem(key, encodedValue);
    } catch (error) {
        console.error('Failed to set item in localStorage', error);
    }
};

export const deleteItem = (key: IStorageKeys): void => {
    localStorage.removeItem(key);
};

function useLocalStorage<T>(key: IStorageKeys, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => getItem(key, initialValue));

    useEffect(() => {
        setItem(key, storedValue, initialValue);
    }, [key, storedValue, initialValue]);

    const setValue = (value: T) => {
        setStoredValue(value);
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
