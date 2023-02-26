import createTheme from '@mui/material/styles/createTheme'

const lightThemeTokens = {
  primary: {
    light: '#3a4c40',
    main: '#507963',
    dark: '#6aa68b',
    default: '#507963',
  },
  grey: {
    0: '#ffffff',
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000',
  },
  background: {
    light: '#ffffff',
    main: '#fcfcfc',
    dark: '#f9f9f9',
    default: '#fcfcfc',
  },
}

export const themeSettings = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      ...lightThemeTokens,
    },
    typography: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: 12,
      h1: {
        fontSize: 40,
        color: lightThemeTokens.grey[800],
      },
      h2: {
        fontSize: 32,
        color: lightThemeTokens.grey[800],
      },
      h3: {
        fontSize: 24,
        color: lightThemeTokens.grey[800],
      },
      h4: {
        fontSize: 20,
        color: lightThemeTokens.grey[800],
      },
      h5: {
        fontSize: 16,
        color: lightThemeTokens.grey[800],
      },
      h6: {
        fontSize: 14,
        color: lightThemeTokens.grey[800],
      },
    },
  })

  return theme
}
