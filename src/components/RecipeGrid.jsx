import React from 'react';
import { Grid, Box } from '@mui/material';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onCardClick, loading }) => {
    // Create placeholder array for shimmer loading
    const placeholders = Array(8).fill(null);

    return (
        <Grid container spacing={3} justifyContent='center'>
            {loading
                ? // Show shimmer loading placeholders
                  placeholders.map((_, index) => (
                      <Grid
                          item
                          key={`skeleton-${index}`}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          sx={{ display: 'flex' }}
                      >
                          <RecipeCard loading={true} />
                      </Grid>
                  ))
                : // Show actual recipes
                  recipes.map((recipe) => (
                      <Grid
                          item
                          key={recipe._id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          sx={{ display: 'flex' }}
                      >
                          <RecipeCard
                              recipe={recipe}
                              onClick={onCardClick}
                              loading={false}
                          />
                      </Grid>
                  ))}
        </Grid>
    );
};

export default RecipeGrid;
