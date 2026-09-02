---
name: Modern Bibliophile
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#57423b'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#8b7169'
  outline-variant: '#dec0b6'
  surface-tint: '#a43c12'
  primary: '#a43c12'
  on-primary: '#ffffff'
  primary-container: '#ff7f50'
  on-primary-container: '#6c2000'
  inverse-primary: '#ffb59c'
  secondary: '#506072'
  on-secondary: '#ffffff'
  secondary-container: '#d3e4fa'
  on-secondary-container: '#566678'
  tertiary: '#43617c'
  on-tertiary: '#ffffff'
  tertiary-container: '#89a7c4'
  on-tertiary-container: '#1d3c55'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#380c00'
  on-primary-fixed-variant: '#822800'
  secondary-fixed: '#d3e4fa'
  secondary-fixed-dim: '#b7c8dd'
  on-secondary-fixed: '#0c1d2c'
  on-secondary-fixed-variant: '#384859'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#abcae8'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#2b4963'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is built on the "Modern Bibliophile" narrative—a bridge between the tactile, intellectual weight of a physical library and the fluid connectivity of a modern digital community. The brand personality is scholarly yet accessible, quiet yet engaging, and deeply rooted in the editorial tradition.

The design style leans into **Minimalist Editorial with Tactile warmth**. It prioritizes generous spacing (the "margins" of a book) and high-quality typography to ensure that user-generated content and literature remain the focus. The interface avoids aggressive digital tropes, opting instead for soft depth and a rhythmic layout that encourages long-form reading and thoughtful discussion.

## Colors

The color palette has transitioned to a **Light Mode** foundation, evoking the feel of high-quality cream paper and fresh ink. The palette is grounded in a warm Neutral (Cream), providing a classic, high-legibility backdrop for reading.

- **Primary (Coral - #ff7f50):** Used for high-priority calls to action (e.g., "Join Discussion," "Start Reading"). It provides a vibrant, modern energy against the traditional base.
- **Secondary (Library Navy - #1a2a3a):** Used for primary navigation, footers, and high-level headings to provide structural grounding and a sense of authority.
- **Tertiary (Ink Blue - #3e5c76):** Employed for secondary actions, iconography, and metadata labels.
- **Neutral (Cream):** A series of warm, off-white tones that mimic physical paper, reducing eye strain while maintaining a high-end editorial feel.

## Typography

This design system utilizes a high-contrast typographic pairing. **Playfair Display** provides the editorial "voice" for titles and featured quotes, echoing the aesthetic of classic publishing. **Inter** handles the functional heavy lifting, ensuring high legibility for long-form discussions and interface labels.

In this light mode environment, text is rendered in deep navies and dark greys to ensure optimal contrast against the cream background. Paragraphs utilize a slightly wider line height (1.6x) to facilitate comfortable reading, mimicking the typesetting found in premium journals.

## Layout & Spacing

The layout follows a **Fluid Editorial Grid**. On desktop, a 12-column grid is used with generous 48px outer margins to mimic the wide gutters of a premium hardcover book. 

- **Vertical Rhythm:** Spacing is strictly based on an 8px scale. Large sections (e.g., between chapters or discussion topics) should use 64px or 80px gaps to signal a mental shift.
- **Mobile Adaptation:** On mobile, the grid collapses to 4 columns. Headings scale down to prevent excessive line-breaking, and margins tighten to 16px to maximize the reading area.
- **Content Focus:** Main reading content is constrained to a maximum width of 720px (approx. 70-80 characters per line) even on ultra-wide displays to maintain optimal readability.

## Elevation & Depth

In Light Mode, elevation is communicated through **Ambient Shadows** and subtle tonal shifts. Surfaces appear to lift off the cream background using soft, diffused shadows that feel natural and non-distracting.

- **Level 0 (Surface):** The base cream background.
- **Level 1 (Cards/Elements):** A surface-container color with a very soft, high-blur shadow to suggest paper resting on a desk. Used for book cards and thread containers.
- **Level 2 (Modals/Popovers):** Higher lift with more pronounced shadows to focus attention.
- **Depth Cues:** Use subtle 1px borders in Ink Blue (at low opacity) instead of heavy shadows for separating secondary UI elements like sidebar modules.

## Shapes

The shape language is **Refined and Soft**. Following the `roundedness: 2` logic, standard UI elements (buttons, inputs) utilize a 0.5rem (8px) corner radius. 

Larger containers, such as book cover previews or featured collection banners, should use `rounded-lg` (16px) to emphasize a friendly, tactile feel. Avatars for community members should be fully circular to distinguish "people" from "objects" (books/cards).

## Components

- **Primary Buttons:** Coral background, white text, 8px radius. Use a subtle lift on hover.
- **Secondary Buttons:** Library Navy outline (1px) with navy text; transparent background.
- **Reading Status Indicators:** Small, pill-shaped tags (e.g., "Currently Reading", "Want to Read"). "Currently Reading" uses a soft Ink Blue tint, while "Finished" uses a muted sage green.
- **Discussion Threads:** Indented via a 2px left-aligned vertical rule in Ink Blue (low opacity). Thread headers feature the user's avatar and a "Moderated" badge.
- **Book Cards:** White surface background with a soft shadow, 16px internal padding. The book cover should have a 4px radius and a subtle "spine" gradient on its left edge to feel three-dimensional.
- **Input Fields:** Pure white or lightest cream background, 1px Ink Blue border (20% opacity), Inter 16px text.