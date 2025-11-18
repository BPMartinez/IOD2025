exports.getRandomNumber = (req, res) => {
  let min = req.query.min ? parseFloat(req.query.min) : 0;
  let max = req.query.max ? parseFloat(req.query.max) : null;

  if (max === null || isNaN(max)) {
    return res.status(400).json({
      error:
        'Please provide at least a valid max query parameter, e.g. /extra/random?max=10'
    });
  }

  if (isNaN(min)) {
    return res.status(400).json({
      error: 'If provided, min must be a valid number'
    });
  }

  if (min > max) {
    return res.status(400).json({
      error: 'min cannot be greater than max'
    });
  }

  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  res.json({
    operation: 'random',
    min,
    max,
    random
  });
};
