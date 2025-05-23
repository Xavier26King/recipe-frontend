import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Container,
    Pagination,
    Paper,
    Chip,
    FormControl,
    InputAdornment,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    useTheme,
    useMediaQuery,
    CircularProgress,
    alpha,
} from '@mui/material';
import RecipeGrid from '../components/RecipeGrid';
import RecipeModal from '../components/RecipeModal';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const RecipePage = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCuisines, setFilterCuisines] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const getItemsPerPage = () => {
        if (isLargeScreen) return 10; 
        if (isMediumScreen) return 7;
        return 5; // for small screens
    };

    useEffect(() => {
        fetchRecipes();
    }, []); // Fetch recipes on component mount

    useEffect(() => {
        let filtered = recipes;

        if (searchQuery) {
            filtered = filtered.filter((recipe) =>
                recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        } // Filter by search query

        if (filterCuisines.length > 0) {
            filtered = filtered.filter((recipe) =>
                filterCuisines.includes(recipe.cuisineType),
            );
        } // Filter by selected cuisines

        setFilteredRecipes(filtered);
        setPage(1); // Reset to first page when filters change
    }, [recipes, searchQuery, filterCuisines]); // Update filtered recipes when search query or cuisines change

    const fetchRecipes = async () => {
        setLoading(true); // Set loading state to true before fetching
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/recipe/`,
            );
            const data = await response.json();
            if (data.recipes) {
                setRecipes(data.recipes);
                setFilteredRecipes(data.recipes);
            }
        } catch (error) {
            console.error('Error while fetching recipes: ', error);
        } finally {
            setLoading(false); // Set loading state to false after fetching
        }
    };

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
        setModalOpen(true);
    }; // Open modal with selected recipe details

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRecipe(null);
    }; // Close modal and reset selected recipe

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }; // Handle page change for pagination

    const handleCuisineChange = (event) => {
        const { value } = event.target;
        setFilterCuisines(typeof value === 'string' ? value.split(',') : value);
    }; // Handle cuisine filter change

    const cuisineOptions = [
        'Indian',
        'Mexican',
        'Chinese',
        'Italian',
        'Thai',
        'Japanese',
        'Mediterranean',
        'American',
    ];

    const itemsPerPage = getItemsPerPage();
    const paginatedRecipes = filteredRecipes.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage,
    ); // Get the recipes for the current page

    return (
        <Container maxWidth='xl' sx={{ py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 4 },
                    mt: 2,
                    mb: 5,
                    borderRadius: 4,
                    background: 'transparent',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    boxShadow: `0 20px 80px ${alpha(theme.palette.common.black, 0.07)}`,
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography
                        variant='h3'
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.primary.main,
                            letterSpacing: '-0.02em',
                            mb: 1,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                        }}
                    >
                        <RestaurantMenuIcon
                            sx={{
                                fontSize: 'inherit',
                                mr: 1,
                                verticalAlign: 'middle',
                            }}
                        />
                        Culinary Explorer
                    </Typography>
                </Box>

                <Box
                    display='flex'
                    gap={3}
                    mb={5}
                    flexWrap='wrap'
                    justifyContent='center'
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: 3,
                        backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.8,
                        ),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.05)}`,
                    }}
                >
                    <TextField
                        label='Search by Name'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant='outlined'
                        slotProps={{
                            inputRoot: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                    </InputAdornment>
                               ),
                            },
                        }}
                        sx={{
                            minWidth: { xs: '100%', sm: 300 },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '& fieldset': {
                                    borderWidth: '1.5px',
                                },
                            },
                        }}
                    />

                    <FormControl sx={{ minWidth: { xs: '100%', sm: 300 } }}>
                        <InputLabel id='cuisine-filter-label'>
                            Cuisines
                        </InputLabel>
                        <Select
                            labelId='cuisine-filter-label'
                            multiple
                            value={filterCuisines}
                            onChange={handleCuisineChange}
                            input={
                                <OutlinedInput
                                    label='Cuisines'
                                    sx={{
                                        borderRadius: 2,
                                        borderWidth: '1.5px',
                                    }}
                                />
                            }
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            size='small'
                                            sx={{
                                                borderRadius: '16px',
                                                fontWeight: 600,
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        borderRadius: 2,
                                        boxShadow:
                                            '0 10px 40px rgba(0,0,0,0.1)',
                                    },
                                },
                            }}
                        >
                            {cuisineOptions.map((cuisine) => (
                                <MenuItem key={cuisine} value={cuisine}>
                                    {cuisine}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {loading ? (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 5 }}
                    >
                        <CircularProgress size={60} thickness={4} />
                    </Box>
                ) : (
                    <>
                        <RecipeGrid
                            recipes={paginatedRecipes}
                            onCardClick={handleCardClick}
                            loading={loading}
                        />

                        {filteredRecipes.length > 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 5,
                                }}
                            >
                                <Pagination
                                    count={Math.ceil(
                                        filteredRecipes.length / itemsPerPage,
                                    )}
                                    page={page}
                                    onChange={handlePageChange}
                                    color='primary'
                                    size='large'
                                    showFirstButton
                                    showLastButton
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            fontWeight: 'bold',
                                            borderRadius: 2,
                                        },
                                        '& .Mui-selected': {
                                            boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                                        },
                                    }}
                                />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    mt: 4,
                                    p: 5,
                                    borderRadius: 3,
                                    backgroundColor: alpha(
                                        theme.palette.background.paper,
                                        0.8,
                                    ),
                                    border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                    }}
                                >
                                    No recipes found matching your criteria.
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{ mt: 1, color: 'text.secondary' }}
                                >
                                    Try adjusting your search or filters.
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Paper>

            <RecipeModal
                open={modalOpen}
                handleClose={handleModalClose}
                recipe={selectedRecipe}
            />
        </Container>
    );
};

export default RecipePage;
