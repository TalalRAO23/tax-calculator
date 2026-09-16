function calculateTaxableIncome(income, deductions) {
  return Math.max(0, income - deductions);
}

function calculateTax(taxableIncome) {
  if (taxableIncome <= 10000) {
    return taxableIncome * 0.10;
  }

  if (taxableIncome <= 40000) {
    return 1000 + (taxableIncome - 10000) * 0.15;
  }

  if (taxableIncome <= 80000) {
    return 5500 + (taxableIncome - 40000) * 0.20;
  }

  return 13500 + (taxableIncome - 80000) * 0.25;
}

function calculateAfterTaxIncome(income, tax) {
  return income - tax;
}

if (typeof module !== "undefined") {
  module.exports = {
    calculateTaxableIncome,
    calculateTax,
    calculateAfterTaxIncome
  };
}
