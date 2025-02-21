"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = Cache;
const NoopyCache_1 = require("./NoopyCache");
const util = require("util");
function Cache(options) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const cache = NoopyCache_1.NoopyCache.getInstance();
            const key = `${propertyKey}_${util.inspect(args, { depth: 1 })}`;
            const cachedValue = cache.get(key);
            if (cachedValue !== null) {
                console.log('Cache hit');
                return cachedValue;
            }
            console.log('Cache miss');
            const result = originalMethod.apply(this, args);
            cache.set(key, result, options.ttl);
            return result;
        };
        return descriptor;
    };
}
