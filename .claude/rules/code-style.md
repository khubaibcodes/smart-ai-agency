# Code Style Rules — Smart AI Agency

## HTML
- Use semantic HTML5 elements only
- Class names: kebab-case (e.g. `service-card`, `hero-title`)
- IDs: camelCase, only for JS hooks (e.g. `contactForm`, `navbar`)
- Every `<img>` needs `alt` text
- Keep all pages' navbar and footer markup identical

## CSS
- All new styles go in `styles.css` under a clearly commented section
- Never use `!important` — fix specificity instead
- Color tokens only via CSS variables defined in `:root`
- No hardcoded pixel values for font sizes — use `clamp()` or `rem`
- Transitions always use `var(--transition)`

## JavaScript
- `const` by default, `let` only when reassignment is needed, never `var`
- Arrow functions for callbacks, named functions for top-level logic
- Always null-check DOM elements: `const el = document.getElementById('x'); if (el) { ... }`
- No `console.log` left in production code
- Async operations must handle both success and error paths
- Form validation: mark invalid fields visually AND prevent submission

## Production Requirements (always apply)
- Error states must be visible to the user, not silently swallowed
- Loading states on all async actions (buttons disabled + spinner)
- All external API calls wrapped in try/catch
- `.env` values referenced by name in comments — never paste actual keys into code
