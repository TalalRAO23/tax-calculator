const express = require('express');
const path = require('path');
const { calculateTax } = require('./lib/taxCalculator');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint - useful for container/orchestrator probes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Calculate tax endpoint
app.post('/calculate', (req, res) => {
  const income = Number(req.body.income);

  if (Number.isNaN(income) || income < 0) {
    return res.status(400).json({ error: 'Please provide a valid, non-negative income.' });
  }

  const result = calculateTax(income);
  res.status(200).json(result);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Tax Calculator app listening on port ${PORT}`);
  });
}

module.exports = app;
