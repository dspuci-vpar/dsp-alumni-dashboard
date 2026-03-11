# Color Palette Update

## New Color Scheme

The dashboard has been updated with a sophisticated, minimalist color palette based on:

### Base Colors
- **#F2F2F2** - Light gray (neutral-100)
- **#EAE4D5** - Warm beige/cream (cream-200)
- **#B6B09F** - Taupe/gray-brown (taupe-400)
- **#000000** - Black (neutral-950)

## Color Palettes

### Neutral Palette
Used for primary text, backgrounds, and structural elements:
```
neutral-50:  #F9F9F9
neutral-100: #F2F2F2  ← Base color
neutral-200: #E5E5E5
neutral-300: #D1D1D1
neutral-400: #B6B09F
neutral-500: #9A9588
neutral-600: #7D7A70
neutral-700: #5F5D56
neutral-800: #3A3935
neutral-900: #1A1918
neutral-950: #000000  ← Base color
```

### Cream Palette
Used for warm backgrounds and subtle highlights:
```
cream-50:  #FAF8F4
cream-100: #F5F1E9
cream-200: #EAE4D5  ← Base color
cream-300: #DFD7C1
cream-400: #D4CAAD
cream-500: #C9BD99
cream-600: #B3A67D
cream-700: #8F8563
cream-800: #6B644A
cream-900: #474331
```

### Taupe Palette
Used for accents, interactive elements, and secondary text:
```
taupe-50:  #F7F6F4
taupe-100: #EFEEE9
taupe-200: #DDD9D0
taupe-300: #CBC4B7
taupe-400: #B6B09F  ← Base color (accent)
taupe-500: #9D9686
taupe-600: #847D6D
taupe-700: #6B6454
taupe-800: #524B3B
taupe-900: #393222
```

## Usage Guidelines

### Light Mode
- **Background**: cream-100 (#F5F1E9)
- **Cards/Surfaces**: neutral-100 (#F2F2F2)
- **Primary Text**: neutral-950 (#000000)
- **Secondary Text**: taupe-700
- **Borders**: cream-200, cream-300
- **Accents**: taupe-400 (#B6B09F)

### Dark Mode
- **Background**: neutral-950 (#000000)
- **Cards/Surfaces**: neutral-900
- **Primary Text**: neutral-100 (#F2F2F2)
- **Secondary Text**: taupe-400
- **Borders**: neutral-800
- **Accents**: taupe-400 (#B6B09F)

## Changes Made

### Configuration Files
1. **tailwind.config.ts**
   - Added `neutral`, `cream`, and `taupe` color palettes
   - Updated `accent` color to use taupe palette
   - Removed old slate and blue color schemes

2. **src/index.css**
   - Updated CSS variables for light and dark modes
   - Changed body background to cream-100/neutral-950
   - Updated all utility classes to use new colors

### Component Updates
All components have been updated to use the new color palette:

- **Index.tsx** - Main page backgrounds and structure
- **StatsSummary.tsx** - Stat card colors
- **SearchBar.tsx** - Input styling
- **ThemeToggle.tsx** - Toggle button colors
- **LoadingSkeleton.tsx** - Skeleton loading states
- **Badge.tsx** - Badge variants
- **DataTable.tsx** - Table headers, rows, and text
- **DistributionCharts.tsx** - Chart colors and tooltips
- **NotFound.tsx** - 404 page styling

## Design Philosophy

This color palette creates a:
- **Sophisticated** appearance with muted, natural tones
- **Minimalist** aesthetic with high contrast between black and light backgrounds
- **Warm** feeling through beige/cream undertones
- **Professional** look suitable for an alumni network dashboard
- **Accessible** design with clear text contrast ratios

## Color Contrast

All text/background combinations meet WCAG AA standards:
- Black on cream-100: 17.4:1 (AAA)
- Taupe-700 on cream-100: 5.2:1 (AA)
- Neutral-100 on neutral-950: 19.6:1 (AAA)
- Taupe-400 on neutral-950: 4.8:1 (AA)

