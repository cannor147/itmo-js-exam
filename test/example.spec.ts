import { sum } from '../src/example';

describe('Функция sum', () => {
  it('должна корректно складывать положительные числа', () => {
    expect(sum(2, 3)).toBe(5);
  });
});
