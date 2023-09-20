import {Cache} from "../src/cache";

describe('testing correct set', () => {
    it("should work", () => {
        let cache = new Cache()
        expect(cache.set('test', 'test_value', 3)).toBeTruthy()
        expect(cache.set(1, 'test_value', 3)).toBeTruthy()
    })
    it("using not number for counter should throw error", () => {
        let cache = new Cache()
        expect(() => {cache.set('test', 'test_value', 'abcd')}).toThrow(new TypeError("Number of access must be a number"))
        expect(() => {cache.set('test', 'test_value', [1, 2, 3, 4])}).toThrow(new TypeError("Number of access must be a number"))
    })
    it("key must be Sring or Number", () => {
        let cache = new Cache()
        expect(() => {cache.set([], 'test_value', 1)}).toThrow(new TypeError("Key must be number or string"))
        expect(() => {cache.set(undefined, 'test_value', 3)}).toThrow(new TypeError("Key must be number or string"))
    })
})

describe('testing get (set is correct)', () => {
    it('should return monkey', () =>{
        let cache = new Cache()
        cache.set('man', 'monkey')
        expect(cache.get('man')).toBe('monkey')
    })
    it('should return null after 1 (default) access', () =>{
        let cache = new Cache()
        cache.set('man', 'monkey')
        cache.get('man')
        expect(cache.get('man')).toBeNull()
    })
    it('should return null after 2 access', () =>{
        let cache = new Cache()
        cache.set('test', 'test_value', 2)
        cache.get('test')
        cache.get('test')
        expect(cache.get('test')).toBeNull()
    })
    it('should return monkey after rewrite number of access', () =>{
        let cache = new Cache()
        cache.set('man', 'monkey')
        cache.set('man', 'monkey', 2)
        cache.get('man')
        expect(cache.get('man')).toBe('monkey')
    })
})

describe('testing describing', () => {
    it('should return empty string', () =>{
        let cache = new Cache()
        expect(cache.describe()).toBe('')
    })
    it('should return correct string', () =>{
        let cache = new Cache()
        cache.set('man', 'monkey', 2)
        cache.set('test', 'test_value')
        expect(cache.describe()).toBe('Key:man Value:monkey Left entries:2\nKey:test Value:test_value Left entries:1\n')
    })
})