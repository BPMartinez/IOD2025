const axios = require("axios");

const JSONPLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com";


exports.getExternalPosts = async (req, res) => {
  try {

    const limit = parseInt(req.query.limit, 10) || 10;

    const response = await axios.get(`${JSONPLACEHOLDER_BASE_URL}/posts`);

  
    const posts = response.data.slice(0, limit);


    const mapped = posts.map((p) => ({
      id: p.id,
      title: p.title,
      body: p.body,
      externalSource: "JSONPlaceholder",
    }));

    res.json({
      count: mapped.length,
      data: mapped,
    });
  } catch (err) {
    console.error("Error fetching external posts:", err.message);
    res.status(500).json({
      message: "Failed to fetch external posts",
      error: err.message,
    });
  }
};


exports.getExternalPostById = async (req, res) => {
  try {
    const { id } = req.params; 

    const response = await axios.get(`${JSONPLACEHOLDER_BASE_URL}/posts/${id}`);

    if (!response.data || Object.keys(response.data).length === 0) {
      return res.status(404).json({ message: "External post not found" });
    }

    const post = {
      id: response.data.id,
      title: response.data.title,
      body: response.data.body,
      externalSource: "JSONPlaceholder",
    };

    res.json(post);
  } catch (err) {
    console.error("Error fetching external post:", err.message);

    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "External post not found" });
    }

    res.status(500).json({
      message: "Failed to fetch external post",
      error: err.message,
    });
  }
};
