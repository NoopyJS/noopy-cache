import { CacheInterface } from '../src/core/CacheInteface';
import { NoopyCache } from '../src';

class MockCache<T> implements CacheInterface<T> {
    private store: Map<string, T> = new Map();

    get(key: string): T | null {
        return this.store.get(key) || null;
    }

    set(key: string, value: T): void {
        this.store.set(key, value);
    }

    delete(key: string): void {
        this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }

    has(key: string): boolean {
        return this.store.has(key);
    }

    size(): number {
        return this.store.size;
    }
}

describe('NoopyCache', () => {
    let cache: NoopyCache<string>;

    beforeEach(() => {
        cache = new NoopyCache<string>(new MockCache<string>());
    });

    test('should set and get a value', () => {
        cache.set('key1', 'value1');
        expect(cache.get('key1')).toBe('value1');
    });

    test('should return null for non-existent key', () => {
        expect(cache.get('key2')).toBeNull();
    });

    test('should delete a key', () => {
        cache.set('key1', 'value1');
        cache.delete('key1');
        expect(cache.get('key1')).toBeNull();
    });

    test('should clear all keys', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');
        cache.clear();
        expect(cache.size()).toBe(0);
    });

    test('should check if a key exists', () => {
        cache.set('key1', 'value1');
        expect(cache.has('key1')).toBe(true);
        expect(cache.has('key2')).toBe(false);
    });
});
