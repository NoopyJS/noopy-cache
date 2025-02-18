import {CacheInterface} from "./CacheInteface";
import {CacheLocalStorage} from "./CacheLocalStorage";

export class NoopyCache<T> {
    private cacheSystem: CacheInterface<T>;
    private static instance: NoopyCache<any>;

    constructor(cacheSystem?: CacheInterface<T>) {
        this.cacheSystem = cacheSystem || new CacheLocalStorage();
    }

    static configure(cache: CacheInterface<any>) {
        this.instance = new NoopyCache(cache);
    }

    static getInstance<T>(): NoopyCache<T> {
        if(!this.instance) {
            this.instance = new NoopyCache<T>();
        }
        return this.instance;
    }

    set(key: string, value: T, ttl?: number): void {
        this.cacheSystem.set(key, value, ttl);
    }

    get(key: string): T | null {
        return this.cacheSystem.get(key);
    }

    delete(key: string): void {
        this.cacheSystem.delete(key);
    }

    clear(): void {
        this.cacheSystem.clear();
    }

    has(key: string): boolean {
        return this.cacheSystem.has(key);
    }

    size(): number {
        return this.cacheSystem.size();
    }
}
