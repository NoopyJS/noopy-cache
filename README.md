# noopy-cache

`noopy-cache` is a simple and flexible caching library for TypeScript, providing an easy-to-use interface for caching data with support for different storage backends.

## Features

- Simple and intuitive API
- Support for custom cache backends
- Configurable time-to-live (TTL) for cache entries
- Singleton instance for global cache access
- Debug mode for logging cache hits and misses

## Installation

```sh
npm install @noopyjs/noopy-cache
```

## Usage

Basic Usage

```typescript
import { NoopyCache } from 'noopy-cache';

// Create a cache instance
const cache = NoopyCache.getInstance<string>();

// Set a value in the cache
cache.set('key', 'value', 60); // TTL is 60 seconds

// Get a value from the cache
const value = cache.get('key');
console.log(value); // Output: 'value'

// Check if a key exists in the cache
const exists = cache.has('key');
console.log(exists); // Output: true

// Delete a value from the cache
cache.delete('key');

// Clear the entire cache
cache.clear();
```

## Custom Cache Backend

You can create a custom cache backend by implementing the CacheInterface.

```typescript
import { CacheInterface } from 'noopy-cache';

class CustomCache<T> implements CacheInterface<T> {
    // Implement the required methods
    get(key: string): T | null { /* ... */ }
    set(key: string, value: T, ttl?: number): void { /* ... */ }
    delete(key: string): void { /* ... */ }
    clear(): void { /* ... */ }
    has(key: string): boolean { /* ... */ }
    size(): number { /* ... */ }
}

// Configure NoopyCache to use the custom backend
NoopyCache.configure(new CustomCache<string>());
```

## Decorator

You can use the **Cache** decorator to cache the result of a method.

```typescript
import { Cache } from 'noopy-cache';

class Example {
    @Cache({ ttl: 60 })
    expensiveOperation(param: string): string {
        // Perform expensive operation
        return `Result for ${param}`;
    }
}

const example = new Example();
console.log(example.expensiveOperation('test')); // Cache miss
console.log(example.expensiveOperation('test')); // Cache hit
```
