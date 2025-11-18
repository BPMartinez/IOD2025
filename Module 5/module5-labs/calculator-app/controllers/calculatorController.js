const calculator = require('../lib/Calculator');

function getNumbers(req, res) {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).json({
      error:
        'Please provide valid numbers using query parameters num1 and num2, e.g. ?num1=10&num2=5'
    });
    return null;
  }

  return { num1, num2 };
}

exports.add = (req, res) => {
  const nums = getNumbers(req, res);
  if (!nums) return;

  const record = calculator.add(nums.num1, nums.num2);

  res.json({
    operation: record.operation,
    num1: record.num1,
    num2: record.num2,
    result: record.result,
    id: record.id        // extra detail; tests will ignore this
  });
};

exports.subtract = (req, res) => {
  const nums = getNumbers(req, res);
  if (!nums) return;

  const record = calculator.subtract(nums.num1, nums.num2);

  res.json({
    operation: record.operation,
    num1: record.num1,
    num2: record.num2,
    result: record.result,
    id: record.id
  });
};

exports.multiply = (req, res) => {
  const nums = getNumbers(req, res);
  if (!nums) return;

  const record = calculator.multiply(nums.num1, nums.num2);

  res.json({
    operation: record.operation,
    num1: record.num1,
    num2: record.num2,
    result: record.result,
    id: record.id
  });
};

exports.divide = (req, res) => {
  const nums = getNumbers(req, res);
  if (!nums) return;

  try {
    const record = calculator.divide(nums.num1, nums.num2);

    res.json({
      operation: record.operation,
      num1: record.num1,
      num2: record.num2,
      result: record.result,
      id: record.id
    });
  } catch (err) {
    if (err.code === 'DIVIDE_BY_ZERO') {
      return res.status(400).json({ error: 'Cannot divide by zero' });
    }

    console.error(err);
    res.status(500).json({ error: 'Unexpected error performing division' });
  }
};
