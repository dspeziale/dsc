---
name: Dark Tech Architecture
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#bcc7de'
  on-secondary: '#263143'
  secondary-container: '#3e495d'
  on-secondary-container: '#aeb9d0'
  tertiary: '#d9dcec'
  on-tertiary: '#2c303c'
  tertiary-container: '#bdc0d0'
  on-tertiary-container: '#4b4e5b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#dfe2f2'
  tertiary-fixed-dim: '#c3c6d6'
  on-tertiary-fixed: '#171b27'
  on-tertiary-fixed-variant: '#434653'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  title-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The visual identity centers on the persona of a veteran AI Architect: authoritative, precise, and profoundly experienced. The aesthetic reflects an intersection of "Deep Tech" and "Executive Clarity." It avoids the neon-heavy tropes of cyber-aesthetics in favor of a mature, "Dark Tech" minimalist style. 

The emotional response should be one of quiet confidence and high-end stability. By utilizing a restrained color palette and generous whitespace, the interface communicates that the complexity of AI is being managed by a master of the craft. Key stylistic drivers include:
- **Minimalism:** Stripping away visual noise to focus on data density and architectural oversight.
- **Precision:** Perfect alignment and hairline borders that mimic technical blueprints.
- **Subtle Glassmorphism:** Using depth to represent layers of abstraction within AI systems, rendered through translucent surfaces rather than heavy shadows.

## Colors

The palette is engineered for prolonged focus in high-stakes environments. 
- **Deep Midnight Navy (#0B0F1A)** serves as the absolute foundation, providing a "void" that allows technical data to recede or advance naturally.
- **Slate Grey (#1E293B)** is utilized for structural elements, containers, and secondary surfaces.
- **Electric Cyan (#22D3EE)** is the high-voltage accent, reserved strictly for interactive states, progress indicators, and critical data points.
- **White and Slate-100** provide crisp, high-legibility contrast for long-form reading and code inspection.

Surface treatments use a "layering" logic: the more important the information, the lighter and more translucent the Slate Grey surface becomes against the Midnight Navy base.

## Typography

Typography is treated as a technical instrument. **Geist** is the primary typeface, chosen for its monolinear, geometric precision and developer-centric soul. It provides the high legibility required for complex AI documentation and architectural schemas.

For metadata, status codes, and engineering specs, **JetBrains Mono** is introduced to provide a clear visual distinction between narrative content and technical data. 

Hierarchy is established primarily through weight and size rather than color shifts, maintaining a disciplined, monochromatic feel punctuated only by the Electric Cyan accent in functional labels.

## Layout & Spacing

The layout philosophy follows a **Rigid Geometric Grid** with flexible internal modules. We use a 12-column grid for desktop with 24px gutters. The system relies on "expansive" whitespace—spacing is used intentionally to separate different cognitive contexts of the AI workload.

- **Vertical Rhythm:** A 4px baseline grid ensures alignment between text and technical iconography.
- **Breakpoints:** 
    - Desktop: 1280px+ (12 columns, 64px margins)
    - Tablet: 768px - 1279px (8 columns, 32px margins)
    - Mobile: <767px (4 columns, 20px margins)
- **Reflow:** On smaller screens, sidebars collapse into bottom-anchored sheets to maintain the architect's focus on the primary viewport.

## Elevation & Depth

Depth in this system is not achieved through heavy shadows, but through **Tonal Stacking** and **Refraction**:

1.  **Base Level (L0):** The Midnight Navy floor (#0B0F1A).
2.  **Surface Level (L1):** Slate Grey containers with 50% opacity and a 12px backdrop blur. This creates a "glass floor" effect over the background.
3.  **Active Level (L2):** Elements that are being hovered or interacted with receive a 1px solid border of Electric Cyan at 30% opacity and a very subtle 10% Cyan glow (spread 20px).
4.  **Overlays (L3):** Modals and dropdowns use a higher opacity Slate Grey (80%) with a sharper 1px border (#FFFFFF 15% opacity) to distinguish them from the background architectural layers.

## Shapes

The shape language is "Soft-Technical." We avoid sharp 90-degree corners to ensure the UI feels modern and accessible, but keep radii small (0.25rem) to maintain a sense of structural engineering. 

- **Base Radius (4px):** Used for buttons, input fields, and small cards.
- **Large Radius (8px):** Used for primary content containers and dashboard widgets.
- **Interactive States:** On hover, borders do not thicken; instead, they transition in color from Slate to Cyan to maintain layout stability.

## Components

### Buttons
- **Primary:** Solid Electric Cyan background with Navy text. High contrast, reserved for final actions (e.g., "Deploy Model").
- **Secondary:** Ghost style with a 1px Slate Grey border and White text. On hover, the border glows Cyan.
- **Tertiary/Icon:** No background or border. Monochromatic until interacted with.

### Input Fields
Dark Navy background with a 1px Slate border. Focus state triggers a Cyan hairline border and a subtle internal glow. Labels are always JetBrains Mono at 12px, positioned above the field.

### Cards & Modules
Utilize the L1 Glassmorphism treatment (50% Slate, 12px blur). Headers within cards should have a subtle bottom border (1px, 10% White) to separate titles from content without adding bulk.

### Status Indicators
AI status should be communicated via "Pulse" components—small 8px circles. 
- **Active:** Cyan pulse.
- **Idle:** Slate pulse.
- **Warning/Error:** Amber (use sparingly as a system override).

### Data Visualizations
Charts should use Electric Cyan for the primary data line, with Slate Grey for grid lines. Background fills for area charts should use a gradient from Cyan (10% opacity) to transparent.