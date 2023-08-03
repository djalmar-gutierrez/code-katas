import { squareSum } from './index.ts';

/**
 * @group 8kyu
 */
describe('8kyu - Square(n) Sum', () => {
    it('should return the sum of squares for a given array', () => {
        const array = [1, 1, 1, 1, 1];
        expect(squareSum(array)).toBe(5);
    });
    it('should return the sum of squares for a given array', () => {
        const array = [0, 0];
        expect(squareSum(array)).toBe(0);
    });
    it('should return the sum of squares for a given array', () => {
        const array = [1, 2, 2];
        expect(squareSum(array)).toBe(9);
    });
});
