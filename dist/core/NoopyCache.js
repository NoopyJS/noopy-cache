"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopyCache = void 0;
const CacheLocalStorage_1 = require("./CacheLocalStorage");
class NoopyCache {
    constructor(cacheSystem) {
        this.cacheSystem = cacheSystem || new CacheLocalStorage_1.CacheLocalStorage();
    }
    static configure(cache) {
        this.instance = new NoopyCache(cache);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new NoopyCache();
        }
        return this.instance;
    }
    set(key, value, ttl) {
        this.cacheSystem.set(key, value, ttl);
    }
    get(key) {
        return this.cacheSystem.get(key);
    }
    delete(key) {
        this.cacheSystem.delete(key);
    }
    clear() {
        this.cacheSystem.clear();
    }
    has(key) {
        return this.cacheSystem.has(key);
    }
    size() {
        return this.cacheSystem.size();
    }
}
exports.NoopyCache = NoopyCache;
