export interface CacheInterface<T> {
    get(key: string): T | null;
    set(key: string, value: T, ttl?: number): void;
    delete(key: string): void;
    clear(): void;
    has(key: string): boolean;
    size(): number;
}
