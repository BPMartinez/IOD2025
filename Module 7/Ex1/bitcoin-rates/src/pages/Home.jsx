import { Typography, Box } from "@mui/material";
import Emoji from "../components/Emoji";
import PostList from "../components/PostList";

function Home() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Home
      </Typography>
      <Typography variant="body1">
        Welcome to the crypto dashboard. Change your mood below and explore some posts:
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Emoji />
      </Box>

      <PostList />
    </Box>
  );
}

export default Home;
