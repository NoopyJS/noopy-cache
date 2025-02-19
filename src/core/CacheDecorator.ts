import {NoopyCache} from "./NoopyCache";
import * as util from 'util';

export function Cache(options: {ttl: number}) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const cache = NoopyCache.getInstance<any>()
            const key = `${propertyKey}_${util.inspect(args, {depth: 1})}`;
            const cachedValue = cache.get(key);

            if(cachedValue !== null) {
                if(cache.debug) {
                    console.log('Cache hit for key:', propertyKey);
                }
                return cachedValue
            }

            if(cache.debug) {
                console.log('Cache miss for key:', propertyKey);
            }
            const result = originalMethod.apply(this, args);
            cache.set(key, result, options.ttl);
            return result;
        }

        return descriptor;
    }
}
