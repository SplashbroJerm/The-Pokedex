# The Pokedex CSS Code Explanation

This document provides an explanation of The Poxedex website CSS code.


## Table of Contents
1. [Global Reset & Box Model](#global-reset-&-box-model)
2. [Use of CSS Variables](#use-of-css-variables)
3. [Organized CSS Structure](#organized-css-structure)
4. [Responsive Design](#responsive-design)
5. [Typography Styling](#typography-styling)
6. [Color Scheme & Contrast](#color-scheme-&-contrast)
7. [Flexbox/Grid Usage](#typography-styling)
8. [Button & Input Styling](#button-&-input-styling)
9. [Component Reusability](#component-reusability)
10. [CSS Transitions](#css-transitions)
11. [Hover/Focus Effects](#hover/focus-effects)
12. [Layout Containers](#layout-containers)
13. [Utility Classes](#utility-classes)
14. [Use of Pseudo-classes/elements](#use-of-pseudo-classes/elements)
15. [Shadows & Borders](#shadows-&-borders)
16. [Theme Customization](#theme-customixation)
17. [Naming Conventions](#naming-conventions)
18. [Cleanliness & Commenting](#cleanliness-&-commenting)

## Global Reset & Box Model
Uses universal selector with "box-sizing" and resets.
```css
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}
```

## Use of CSS Variables
Defines and reuses ":root" variables effectively
```css
:root{
    --favorited: #ff0000;
}
```

## Organized CSS Structure
Groups styles logically with comments
```css
/* button styles */
button {
    background-color: var(--button-bg);
    color: var(--button-text);
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background-color 0.2s;
}
```

## Responsive Design
Uses media quieries and flexible units
```css
@media (max-width: 768px) {
    #side-bar {
        width: 100%;
        height: auto;
        position: relative;
        border-right: none;
        border-bottom: 3px solid var(--text-color);
    }
    .pokemon-grid {
        margin-left: 0;
        margin-right: 0;
    }
    
}
```

## Typography Styling
Consistent fonts, weights, spacing.
```css
font-family: Arial, Helvetica, sans-serif;
```

## Color Scheme & Contrast
Well-chosen, accessible color combinations
```css
body{
background-color: #f5f5f5;
color: #333;
}
```

## Flexbox/Grid Usage
Layouts use display: flex or grid correctly
```css
.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-left: 220px;
    margin-right: 20px;
    margin-top: 20px;
}
```

## Button & Input Styling
Stylish, accessible buttons/inputs
```css
button:hover {
    background-color: var(--button-hover);
}
```

## Component Reusability
Common classes used across elements
```css
.pokemon-card, .links
```

## CSS Transitions
Smooth transitions animations used.
```css
/* actual card itself styles */
.pokemon-card {
    background: var(--bg-color);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
    border: 3px solid var(--text-color);
}

/* actual card itself while hoveredd styles */
.pokemon-card:hover {
    transform: translateY(-5px);
    border: 3px solid var(--button-hover);
}
```

## Hover/Focus Effects
Visual feeddback on interaction states
```css
.links:hover{
    background-color: var(--card-border);
}
.fav-clicked:hover{
    background-color: rgb(121, 4, 4);
}
```

## Layout Containers
Uses ".container, .wrapper, or .section" classes effectively
```css
.search-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
```

## Utility Classes
Uses or creates helpful single-purpose classes
```css
.fav-clicked
```

## Use of Pseudo Classes/Elements
applies ::before, ::after, ::nth-child, etc.
```css
.search-container::before{
    width: 100%;
    height: 2px;
    background-color: var(--text-color);
    margin-bottom: 10px;
}
```

## Shadows & Borders
Aesthetic use of box-shadow, border-radius
```css
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
```

## Theme Customization
Themes applied dynamically or toggled
```css
/* light theme settings */
.light-theme {
    --bg-color: #f5f5f5;
    --text-color: #333;
    --card-bg: #fff;
    --card-border: #ddd;
    --button-bg: #4a90e2;
    --button-text: #fff;
    --button-hover: #3a7bc8;
}
/* dark theme settings */
.dark-theme {
    --bg-color: #222;
    --text-color: #f5f5f5;
    --card-bg: #333;
    --card-border: #444;
    --button-bg: #5a5eb9;
    --button-text: #fff;
    --button-hover: #484a94;
}
```

## Naming Conventions
Uses clear, consistent class names
```css
.pokemon-grid, .pokemon-card, .links
```

## Cleanliness and Commenting
Well-commented, no redundant or unused code
```css
.pokemon-card:hover {
    transform: translateY(-5px); /*Moves card*/
    border: 3px solid var(--button-hover);
}
```