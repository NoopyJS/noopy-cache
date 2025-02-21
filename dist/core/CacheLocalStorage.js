"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheLocalStorage = void 0;
class CacheLocalStorage {
    constructor(ttl = 60) {
        this.ttl = ttl;
        this.cache = new Map();
    }
    clear() {
        this.cache.clear();
    }
    delete(key) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
    }
    get(key) {
        const item = this.cache.get(key);
        if (!item)
            return null;
        if (item.expiration && item.expiration < Date.now()) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }
    has(key) {
        return this.cache.has(key);
    }
    set(key, value, ttl) {
        const expiration = ttl ? Date.now() + ttl * 1000 : this.ttl ? Date.now() + this.ttl * 1000 : null;
        this.cache.set(key, { value, expiration: expiration });
    }
    size() {
        return this.cache.size;
    }
}
exports.CacheLocalStorage = CacheLocalStorage;
