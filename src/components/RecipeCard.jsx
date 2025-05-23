import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardMedia,
    Box,
    Chip,
    Skeleton,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RecipeCard = ({ recipe, onClick, loading }) => {
    if (loading) {
        return (
            <Card
                sx={{
                    height: 350, // Fixed height
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                }}
            >
                <Skeleton variant='rectangular' height={200} animation='wave' />
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Skeleton
                        variant='text'
                        height={30}
                        width='80%'
                        animation='wave'
                    />
                    <Skeleton
                        variant='text'
                        height={20}
                        width='60%'
                        animation='wave'
                    />
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Skeleton
                            variant='rectangular'
                            height={30}
                            width={80}
                            animation='wave'
                        />
                        <Skeleton
                            variant='rectangular'
                            height={30}
                            width={80}
                            animation='wave'
                        />
                    </Box>
                </CardContent>
            </Card>
        );
    }


    return (
        <Card
            onClick={() => onClick(recipe)}
            sx={{
                height: 350, // Fixed height
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.12)',
                },
            }}
        >
            <CardActionArea
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
            >
                <CardMedia
                    component='img'
                    height={200} // Fixed height for image
                    image={recipe.imageUrl}
                    alt={recipe.name}
                    sx={{
                        objectFit: 'cover',
                    }}
                />
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 2.5,
                        background: 'transparent',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                                recipe.cuisineType === 'Indian'
                                    ? 'linear-gradient(135deg, rgba(255,247,230,0.9), rgba(255,224,178,0.7))'
                                    : recipe.cuisineType === 'Mexican'
                                      ? 'linear-gradient(135deg, rgba(232,245,233,0.9), rgba(200,230,201,0.7))'
                                      : recipe.cuisineType === 'Chinese'
                                        ? 'linear-gradient(135deg, rgba(232,234,246,0.9), rgba(197,202,233,0.7))'
                                        : recipe.cuisineType === 'Italian'
                                          ? 'linear-gradient(135deg, rgba(255,235,238,0.9), rgba(255,205,210,0.7))'
                                          : 'linear-gradient(135deg, rgba(245,245,245,0.9), rgba(224,224,224,0.7))',
                            zIndex: -1,
                            backdropFilter: 'blur(5px)',
                        },
                    }}
                >
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            fontWeight: 700,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            color: '#1a1a1a',
                            fontSize: '1.1rem',
                            letterSpacing: '0.01em',
                            lineHeight: 1.3,
                        }}
                    >
                        {recipe.name}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexWrap: 'wrap',
                            mt: 'auto',
                        }}
                    >
                        <Chip
                            icon={<RestaurantIcon fontSize='small' />}
                            label={recipe.cuisineType}
                            size='small'
                            color='primary'
                            sx={{
                                fontWeight: 600,
                                borderRadius: '16px',
                                '& .MuiChip-label': { px: 1 },
                                '& .MuiChip-icon': { fontSize: '0.9rem' },
                            }}
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default RecipeCard;
