const axios = require('axios');

const FAKE_STORE_BASE_URL = 'https://fakestoreapi.com';

exports.getAllProducts = async (req, res) => {
  try {
    const response = await axios.get(`${FAKE_STORE_BASE_URL}/products`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching all products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${FAKE_STORE_BASE_URL}/products/${id}`);

    if (!response.data) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.error('Error fetching product by id:', error.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
