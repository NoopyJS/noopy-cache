import { CacheInterface } from "./CacheInteface";
export declare class CacheLocalStorage<T> implements CacheInterface<T> {
    private ttl;
    private cache;
    constructor(ttl?: number);
    clear(): void;
    delete(key: string): void;
    get(key: string): T | null;
    has(key: string): boolean;
    set(key: string, value: T, ttl?: number): void;
    size(): number;
}
