# Design System Specification: The Technical Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Technical Editorial."** 

We are moving away from the "standard SaaS" aesthetic—characterized by rounded blue buttons and heavy divider lines—and moving toward a high-end, gallery-like experience. This system treats digital interfaces as digital broadsheets: authoritative, spacious, and meticulously organized. By leveraging the geometric rigor of Space Grotesk against a pristine white and light-gray canvas, we create an environment that feels both cutting-edge and timeless.

The "Editorial" feel is achieved through intentional asymmetry (e.g., oversized left-aligned headings balanced by generous right-side white space) and a rejection of traditional containment. We do not "box" content; we let it breathe.

---

## 2. Colors & Tonal Architecture
The palette is rooted in a clinical, clean foundation, punctuated by a high-energy, "vibrant orange" primary color that signals action and innovation.

### The "No-Line" Rule
To achieve a premium feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts. Use `surface-container-low` (#eef1f4) to define a secondary section against a `surface` (#f5f7fa) background. This creates a sophisticated, "paper-on-paper" look rather than a digital "grid."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#f5f7fa)
- **Nested Content:** Use `surface-container-low` (#eef1f4) for grouping.
- **Interactive Elements:** Use `surface-container-lowest` (#ffffff) for cards to make them appear "lifted" naturally via color contrast rather than shadows.

### The Glass & Gradient Rule
To prevent the UI from feeling "flat" or "cheap," primary CTAs should utilize a subtle linear gradient from `primary` (#a73300) to `primary_container` (#ff794a). For floating navigation or overlays, apply **Glassmorphism**: use `surface` at 80% opacity with a `24px` backdrop-blur to allow the content underneath to softly bleed through.

---

## 3. Typography
The typographic system relies on the interplay between the technical "edge" of Space Grotesk and the neutral legibility of Inter.

- **Display & Headline (Space Grotesk):** These are your "Editorial" voices. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero moments. The geometry of Space Grotesk provides the "Tech" aesthetic.
- **Body & Titles (Inter):** Inter handles the heavy lifting of data and long-form reading. It provides a functional counterweight to the personality of the display type.
- **Hierarchy via Scale:** Ensure a dramatic jump between `headline-lg` and `body-lg`. Premium design is often defined by "the bigs being bigger and the smalls being smaller."

---

## 4. Elevation & Depth
Depth in this system is atmospheric, not structural. 

- **The Layering Principle:** Stack `surface-container` tiers. A `surface-container-highest` (#d9dde1) header should feel physically distinct from a `surface` (#f5f7fa) body purely through its tonal value.
- **Ambient Shadows:** Shadows are reserved for floating modals only. They must be "Airy": `0px 20px 40px` blur, with `on_surface` color at **4% opacity**. It should feel like a soft glow of light, not a dark smudge.
- **The Ghost Border Fallback:** If a component (like a search input) requires a boundary for accessibility, use a "Ghost Border": `outline_variant` (#abadb0) at **15% opacity**. This provides a hint of a container without breaking the editorial flow.

---

## 5. Components

### Buttons
- **Primary:** Gradient from `primary` to `primary_container`. Roundedness: `DEFAULT` (0.25rem) for a sharp, professional look. Text: `label-md` (Uppercase, +0.05em tracking).
- **Secondary:** Surface-tonal. Use `surface_container_high` with `on_surface` text. No border.
- **Tertiary:** Text-only with a subtle `primary` underline on hover.

### Cards
- **Construction:** Absolutely no borders. Use `surface_container_lowest` (#ffffff) as the card background against a `surface` (#f5f7fa) background. 
- **Spacing:** Use extreme internal padding (at least `2rem` on mobile) to emphasize the premium editorial feel.

### Input Fields
- **Style:** Understated. Use a `surface_container_low` fill with a bottom-only "Ghost Border" that transitions to `primary` (#a73300) on focus.
- **Labels:** Always use `label-md` in `on_surface_variant` for a muted, professional metadata look.

### Lists & Dividers
- **The Divider Ban:** Do not use horizontal lines to separate list items. Use vertical white space and `body-md` for the title with `body-sm` (muted) for the description. The "white space" is the separator.

### Additional Component: The "Status Badge"
- For tech-heavy data, use small, high-contrast chips. Background: `secondary_container` (#d7e4ec); Text: `on_secondary_container` (#47545a). These should be `full` rounded to contrast with the sharp-edged buttons.

---

## 6. Do's and Don'ts

### Do
- **Do** embrace "uncomfortable" white space. It signals luxury and clarity.
- **Do** use the vibrant orange `primary` sparingly. It is a laser, not a paint bucket.
- **Do** align text-heavy content to a strict baseline grid to maintain the editorial rigor.
- **Do** ensure all touch targets on mobile are at least 48px, even if the visual element is smaller.

### Don't
- **Don't** use black (#000000) for text. Use `on_surface` (#2c2f32) to maintain a soft, high-end contrast.
- **Don't** use 100% opaque borders to define sections. It makes the UI look like a legacy "enterprise" application.
- **Don't** use standard "drop shadows" on cards. Rely on tonal shifts between the surface tiers.
- **Don't** crowd the edges. On mobile, maintain a minimum of `1.5rem` (24px) side margins for all content.