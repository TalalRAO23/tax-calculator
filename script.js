const taxForm = document.getElementById("taxForm");
const incomeInput = document.getElementById("income");
const deductionsInput = document.getElementById("deductions");
const errorBox = document.getElementById("error");
const resultBox = document.getElementById("result");

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

taxForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const income = Number(incomeInput.value);
  const deductions = Number(deductionsInput.value);

  errorBox.textContent = "";

  if (!Number.isFinite(income) || income < 0) {
    resultBox.hidden = true;
    errorBox.textContent = "Please enter a valid income.";
    return;
  }

  if (!Number.isFinite(deductions) || deductions < 0) {
    resultBox.hidden = true;
    errorBox.textContent = "Please enter valid deductions.";
    return;
  }

  const taxableIncome = calculateTaxableIncome(income, deductions);
  const tax = calculateTax(taxableIncome);
  const afterTaxIncome = calculateAfterTaxIncome(income, tax);

  document.getElementById("taxableIncome").textContent =
    formatCurrency(taxableIncome);
  document.getElementById("tax").textContent = formatCurrency(tax);
  document.getElementById("afterTax").textContent =
    formatCurrency(afterTaxIncome);

  resultBox.hidden = false;
});
