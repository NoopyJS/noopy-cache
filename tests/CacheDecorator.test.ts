import { Cache, NoopyCache } from '../src';

class TestClass {
    @Cache({ ttl: 60 })
    fetchData(param: string): string {
        return `Data for ${param}`;
    }
}

describe('CacheDecorator', () => {
    let testInstance: TestClass;

    beforeEach(() => {
        NoopyCache.configure(new NoopyCache<string>());
        testInstance = new TestClass();
    });

    test('should cache the result of a method', () => {
        const result1 = testInstance.fetchData('param1');
        const result2 = testInstance.fetchData('param1');
        expect(result1).toBe(result2);
    });

    test('should return cached value on subsequent calls', () => {
        const result1 = testInstance.fetchData('param1');
        const result2 = testInstance.fetchData('param1');
        expect(result2).toBe('Data for param1');
    });

    test('should handle cache miss correctly', () => {
        const result = testInstance.fetchData('param2');
        expect(result).toBe('Data for param2');
    });
});
