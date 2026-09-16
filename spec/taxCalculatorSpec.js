const { calculateTax } = require('../lib/taxCalculator');

describe('Tax Calculator', () => {

  it('should charge 0% tax for income within the first slab', () => {
    const result = calculateTax(5000);
    expect(result.tax).toBe(0);
    expect(result.netIncome).toBe(5000);
  });

  it('should correctly calculate tax for income in the second slab', () => {
    const result = calculateTax(20000);
    // First 10,000 @ 0% + next 10,000 @ 10% = 1000
    expect(result.tax).toBe(1000);
    expect(result.netIncome).toBe(19000);
  });

  it('should correctly calculate tax for income in the third slab', () => {
    const result = calculateTax(60000);
    // 10,000@0 + 30,000@10% + 20,000@20% = 0 + 3000 + 4000 = 7000
    expect(result.tax).toBe(7000);
    expect(result.netIncome).toBe(53000);
  });

  it('should correctly calculate tax for income in the top slab', () => {
    const result = calculateTax(150000);
    // 10,000@0 + 30,000@10% + 60,000@20% + 50,000@30%
    // = 0 + 3000 + 12000 + 15000 = 30000
    expect(result.tax).toBe(30000);
    expect(result.netIncome).toBe(120000);
  });

  it('should throw an error for negative income', () => {
    expect(() => calculateTax(-100)).toThrowError('Income must be a non-negative number');
  });

  it('should throw an error for non-numeric income', () => {
    expect(() => calculateTax('abc')).toThrowError('Income must be a non-negative number');
  });

  it('should handle zero income', () => {
    const result = calculateTax(0);
    expect(result.tax).toBe(0);
    expect(result.netIncome).toBe(0);
  });

});
