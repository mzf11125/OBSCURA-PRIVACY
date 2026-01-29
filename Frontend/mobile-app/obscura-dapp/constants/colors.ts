/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Obscura Brand Colors - Purple to Black Gradient Theme
const primaryPurple = '#8B5CF6'
const primaryLight = '#A78BFA'

const tintColorLight = primaryPurple
const tintColorDark = primaryPurple

export const Colors = {
  light: {
    background: '#F5F5F5',
    border: '#E0E0E0',
    icon: '#687076',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorLight,
    text: '#11181C',
    tint: tintColorLight,

    // Obscura brand colors (light mode)
    primary: primaryPurple,
    primaryLight: primaryLight,
    card: '#FFFFFF',
    cardGlass: 'rgba(255, 255, 255, 0.9)',

    // Action colors
    max: '#00B894',
    success: '#4CAF50',
    buy: '#4CAF50',
    sell: '#EF4444',

    // Gradient
    gradientStart: primaryPurple,
    gradientEnd: '#1a1a2e',

    // Text variants
    textSecondary: '#666666',
    textTertiary: '#999999',
  },
  dark: {
    // Obscura Dark Theme - Purple to Black Gradient
    background: '#121212',
    backgroundSecondary: '#0A0A0A',
    border: '#2A2A2A',
    icon: '#9BA1A6',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
    text: '#FFFFFF',
    tint: tintColorDark,

    // Obscura brand colors (dark mode)
    primary: primaryPurple,
    primaryLight: primaryLight,
    primaryDark: '#7C3AED',
    card: '#1E1E1E',
    cardGlass: 'rgba(30, 30, 30, 0.8)',
    cardLight: '#252525',

    // Action colors
    max: '#00B894',
    success: '#4CAF50',
    buy: '#4CAF50',
    sell: '#EF4444',
    warning: '#F59E0B',
    error: '#EF4444',

    // Gradient - Purple to Black
    gradientStart: primaryPurple,
    gradientEnd: '#000000',
    gradientMid: '#4C1D95',

    // Text variants
    textSecondary: '#CCCCCC',
    textTertiary: '#999999',

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(255, 255, 255, 0.1)',
  },
}
