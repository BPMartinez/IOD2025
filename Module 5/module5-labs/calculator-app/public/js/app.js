// Handle calculator
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculateBtn');
const resultText = document.getElementById('resultText');

calculateBtn.addEventListener('click', async () => {
  const num1 = num1Input.value;
  const num2 = num2Input.value;
  const operation = operationSelect.value;

  if (num1 === '' || num2 === '') {
    resultText.textContent = 'Please enter both numbers.';
    return;
  }

  try {
    // axios GET with query params
    const response = await axios.get(`/calc/${operation}`, {
      params: { num1, num2 }
    });

    const data = response.data;
    resultText.textContent = `Operation: ${data.operation}
Numbers: ${data.num1} and ${data.num2}
Result: ${data.result}`;
  } catch (error) {
    console.error(error);

    if (error.response && error.response.data && error.response.data.error) {
      resultText.textContent = `Error: ${error.response.data.error}`;
    } else {
      resultText.textContent = 'An error occurred while calling the API.';
    }
  }
});

// Handle random number (extension)
const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');
const randomBtn = document.getElementById('randomBtn');
const randomResult = document.getElementById('randomResult');

randomBtn.addEventListener('click', async () => {
  const min = minInput.value;
  const max = maxInput.value;

  if (max === '') {
    randomResult.textContent = 'Please enter a max value.';
    return;
  }

  try {
    const params = { max };

    if (min !== '') {
      params.min = min;
    }

    const response = await axios.get('/extra/random', { params });

    const data = response.data;
    randomResult.textContent = `Random number between ${data.min} and ${data.max}: ${data.random}`;
  } catch (error) {
    console.error(error);

    if (error.response && error.response.data && error.response.data.error) {
      randomResult.textContent = `Error: ${error.response.data.error}`;
    } else {
      randomResult.textContent = 'An error occurred while fetching random number.';
    }
  }
});
