/**
 * Simple progressive tax calculator.
 * Slabs (illustrative - adjust to match your course's required rates):
 *   0        - 10,000   -> 0%
 *   10,000   - 40,000   -> 10%
 *   40,000   - 100,000  -> 20%
 *   100,000+             -> 30%
 */

function calculateTax(income) {
  if (typeof income !== 'number' || Number.isNaN(income) || income < 0) {
    throw new Error('Income must be a non-negative number');
  }

  const slabs = [
    { limit: 10000, rate: 0 },
    { limit: 40000, rate: 0.10 },
    { limit: 100000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ];

  let remaining = income;
  let previousLimit = 0;
  let tax = 0;

  for (const slab of slabs) {
    if (remaining <= 0) break;
    const slabWidth = slab.limit - previousLimit;
    const taxableInThisSlab = Math.min(remaining, slabWidth);
    tax += taxableInThisSlab * slab.rate;
    remaining -= taxableInThisSlab;
    previousLimit = slab.limit;
  }

  return {
    income,
    tax: Math.round(tax * 100) / 100,
    netIncome: Math.round((income - tax) * 100) / 100,
  };
}

module.exports = { calculateTax };
