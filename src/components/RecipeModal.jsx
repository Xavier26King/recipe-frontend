import React from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    List,
    ListItem,
    Box,
    Chip,
    IconButton,
    Divider,
    ListItemIcon,
    ListItemText,
    Paper,
    useTheme,
    alpha,
    Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const RecipeModal = ({ open, handleClose, recipe }) => {
    const theme = useTheme();

    if (!recipe) return null;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='md'
            slotProps={{
                sx: {
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                },
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        height: '300px',
                        width: '100%',
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${recipe.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 4,
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            color: 'white',
                            fontWeight: 800,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2,
                        }}
                    >
                        {recipe.name}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Chip
                            icon={<RestaurantIcon />}
                            label={recipe.cuisineType}
                            color='primary'
                            sx={{
                                fontWeight: 'bold',
                                bgcolor: alpha(theme.palette.primary.main, 0.9),
                                color: 'white',
                                px: 1,
                                borderRadius: '20px',
                                '& .MuiChip-icon': {
                                    color: 'white',
                                },
                            }}
                        />
                    </Box>
                </Box>

                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.5)',
                        },
                        width: 40,
                        height: 40,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent
                sx={{
                    p: 4,
                    bgcolor: alpha(theme.palette.background.paper, 0.98),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        mt: 1,
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            flex: 1,
                            borderRadius: 3,
                            background: alpha(
                                theme.palette.primary.light,
                                0.05,
                            ),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            height: 'fit-content',
                        }}
                    >
                        <Typography
                            variant='h5'
                            sx={{
                                mb: 3,
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <RestaurantIcon /> Ingredients
                        </Typography>
                        <List sx={{ pl: 1 }}>
                            {recipe.ingredients?.map((ingredient, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        py: 1,
                                        px: 0,
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CheckCircleIcon color='success' />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={ingredient}
                                        primaryTypographyProps={{
                                            fontWeight: 500,
                                            color: theme.palette.text.primary,
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            flex: 1.5,
                            borderRadius: 3,
                            background: alpha(
                                theme.palette.secondary.light,
                                0.05,
                            ),
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                        }}
                    >
                        <Typography
                            variant='h5'
                            sx={{
                                mb: 3,
                                fontWeight: 700,
                                color: theme.palette.secondary.main,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <ArrowRightAltIcon /> Preparation Steps
                        </Typography>
                        <List>
                            {recipe.steps?.map((step, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        alignItems='flex-start'
                                        sx={{
                                            py: 1.5,
                                            px: 0,
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Avatar
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    bgcolor:
                                                        theme.palette.secondary
                                                            .main,
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {index + 1}
                                            </Avatar>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={step}
                                            primaryTypographyProps={{
                                                fontWeight: 500,
                                                color: theme.palette.text
                                                    .primary,
                                                lineHeight: 1.6,
                                            }}
                                        />
                                    </ListItem>
                                    {index < recipe.steps.length - 1 && (
                                        <Divider
                                            variant='inset'
                                            component='li'
                                            sx={{
                                                ml: 7,
                                                borderStyle: 'dashed',
                                                borderColor: alpha(
                                                    theme.palette.divider,
                                                    0.6,
                                                ),
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default RecipeModal;
