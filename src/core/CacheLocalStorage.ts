import {CacheInterface} from "./CacheInteface";

export class CacheLocalStorage<T> implements CacheInterface<T> {

    private cache: Map<String, {value: T, expiration: number | null}> = new Map();

    constructor(private ttl: number = 60) {}

    clear(): void {
        this.cache.clear();
    }

    delete(key: string): void {
        if(this.cache.has(key)) {
            this.cache.delete(key);
        }
    }

    get(key: string): T | null {
        const item = this.cache.get(key);
        if(!item) return null;

        if(item.expiration && item.expiration < Date.now()) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    set(key: string, value: T, ttl?: number): void {
        const expiration = ttl ? Date.now() + ttl * 1000 : this.ttl ? Date.now() + this.ttl * 1000 : null;
        this.cache.set(key, {value, expiration: expiration});
    }

    size(): number {
        return this.cache.size;
    }

}
