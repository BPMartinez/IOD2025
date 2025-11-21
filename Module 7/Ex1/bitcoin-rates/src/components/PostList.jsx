import { Grid, Card, CardContent, CardActions, Typography, Button } from "@mui/material";

const posts = [
  { id: 1, title: "Bitcoin Basics", excerpt: "Learn how Bitcoin works and why it matters." },
  { id: 2, title: "Altcoins 101", excerpt: "Explore other major cryptocurrencies besides BTC." },
  { id: 3, title: "Security Tips", excerpt: "How to keep your crypto safe from scams." },
];

function PostList() {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {posts.map((post) => (
        <Grid item key={post.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.excerpt}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Read More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PostList;
