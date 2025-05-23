import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import RecipePage from './scenes/RecipePage';

function App() {
    const theme = useMemo(() => createTheme(themeSettings('light')), ['light']); // light or dark
    return (
        <>
            <div className='app'>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Routes>
                            <Route path='/' element={<RecipePage />} />
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
