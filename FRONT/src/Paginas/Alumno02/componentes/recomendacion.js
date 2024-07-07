import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RecommendedItems() {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRandomItems() {
      try {
        const response = await fetch('http://grupo5final.azurewebsites.net/productos/random');
        if (!response.ok) {
          throw new Error('Error fetching random items');
        }
        const data = await response.json();
        setRecommendedItems(data);
      } catch (error) {
        console.error("Error fetching random items:", error);
      }
    }

    fetchRandomItems();
  }, []);

  const handleLearnMore = (id) => {
    navigate(`/detalle/${id}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>También te podría interesar...</Typography>
      <Grid container spacing={2}>
        {recommendedItems.map(item => (
          <Grid item xs={12} sm={6} md={2.4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.nombre}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.nombre}
                </Typography>
                <Button size="small" onClick={() => handleLearnMore(item.id)}>Learn More</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecommendedItems;
