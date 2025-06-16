// src/lib/Theme.ts
import {Platform} from 'react-native';

export const colors = {
    primary: '#D30000',        // Red primary color
    secondary: '#E67700',      // Orange secondary
    tertiary: '#008060',       // Teal tertiary
    accent: '#6200EE',         // Purple accent
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceVariant: '#E0E0E0',
    text: '#121212',
    textSecondary: '#505050',
    success: '#006E3B',
    error: '#D30000',          // Red error
    warning: '#E67700',
    info: '#0066CC',
    border: '#CCCCCC',
    cardBackground: '#FFFFFF',
};

export const spacing = {
    xs: 8,
    sm: 12,
    md: 20,
    lg: 32,
    xl: 48,
    xxl: 64,
};

export const typography = {
    fontFamily: {
        heading: 'BricolageGrotesque_400Regular',
        headingBold: 'BricolageGrotesque_500Medium',
        headingExtraBold: 'BricolageGrotesque_700Bold',
        body: 'SpaceGrotesk_400Regular',
        bodyBold: 'SpaceGrotesk_700Bold',
    },
    fontSize: {
        xs: 16,
        sm: 18,
        md: 20,
        lg: 24,
        xl: 32,
        xxl: 40,
    },
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        loose: 1.8,
    }
};

export const borderRadius = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    round: 9999,
};