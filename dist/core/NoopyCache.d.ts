import { CacheInterface } from "./CacheInteface";
export declare class NoopyCache<T> {
    private cacheSystem;
    private static instance;
    constructor(cacheSystem?: CacheInterface<T>);
    static configure(cache: CacheInterface<any>): void;
    static getInstance<T>(): NoopyCache<T>;
    set(key: string, value: T, ttl?: number): void;
    get(key: string): T | null;
    delete(key: string): void;
    clear(): void;
    has(key: string): boolean;
    size(): number;
}
