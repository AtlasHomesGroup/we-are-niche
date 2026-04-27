# Niche — Ecosystem Map · Handoff for Claude Code

A single interactive HTML artifact that visualizes the Niche group as a coral
orbital constellation: one hub (logo) with three connected branches —
Ecosystem, Community, Acquisitions — and eight ventures distributed around
a single ring.

This package is **production-ready as a static prototype**. Open
`Niche Ecosystem Map.html` in any modern browser. No build step required.

---

## 1. What's in the package

```
we-are-niche/
├─ Niche Ecosystem Map.html   # Host page: fonts, tokens, mounts <App />
├─ app.jsx                    # Mounts <Constellation /> with NICHE_DATA
├─ data.jsx                   # All copy + structure (single source of truth)
├─ constellation.jsx          # The orbital diagram (≈760 lines)
├─ assets/
│  └─ niche-logo.png          # The Niche tree mark, used at the hub
└─ CLAUDE_HANDOFF.md          # This file
```

The HTML pulls React 18.3.1, ReactDOM, and Babel Standalone from unpkg
(integrity-pinned). All `.jsx` files are loaded as
`<script type="text/babel" src="...">` — Babel transpiles in the browser.
Components are exposed on `window` so they share scope across files.

If you migrate to a real build (Vite/Next), strip the Babel script tag,
convert each file to ES modules, and replace `window.X = X` with `export`.

---

## 2. Design system

### Tokens (CSS custom properties on `:root`)

| Token | Value | Usage |
|---|---|---|
| `--ink` | `oklch(0.22 0.03 250)` | Primary text |
| `--ink-soft` | `oklch(0.42 0.025 250)` | Body / lede |
| `--ink-faint` | `oklch(0.62 0.02 250)` | Micro labels, footer |
| `--paper` | `oklch(0.985 0.008 80)` | Page background |
| `--paper-warm` | `oklch(0.97 0.014 60)` | Description panel bg |
| `--line` | `oklch(0.88 0.012 80)` | Default rules |
| `--line-soft` | `oklch(0.93 0.01 80)` | Subtle rules |
| `--coral` | `oklch(0.72 0.16 40)` | Brand accent — arcs, ring, dots |
| `--coral-deep` | `oklch(0.62 0.18 35)` | Hover/focus accent, traveler dots |
| `--coral-faint` | `oklch(0.93 0.04 50)` | Tints, halos |

Coral is the only chromatic color in the system. Everything else is the
warm-paper / cool-ink axis. **Do not introduce additional accent hues.**

### Typography

- **Serif** — `Instrument Serif` (italic + roman). Used for the H1, branch
  numbers, venture names, taglines. The serif italic is the brand voice.
- **Sans** — `Manrope` (300–700). Body, UI controls, footer.
- **Mono** — `JetBrains Mono` (400–500). Eyebrow labels, micro tags,
  the `01.02` venture identifiers.

Type rhythm:
- Eyebrow / micro: 9–11px, `letter-spacing: 0.20–0.26em`, uppercase, mono.
- Body: 14–15.5px, `line-height: 1.55`.
- H1: `clamp(36px, 4.6vw, 60px)`, serif, `line-height: 1.1`,
  `letter-spacing: -0.02em`, with one italic word in coral-deep.
- Venture name: 15.5px serif. Role: 10.5px italic, ink-soft.

### Geometry — the orbital

- ViewBox: `1000 × 1000`, hub center `(500, 500)`.
- Ring radius: `R = 270` desktop, `240` mobile.
- Branch centers (degrees, SVG convention 0°=right, 90°=down):
  - Ecosystem `-90` (top), Community `30` (bottom-right),
    Acquisitions `150` (bottom-left).
- Arc spread per branch: `70°` for 3-node branches, `38°` for 2-node.
  Total arc coverage ≈ 178° → ≈ 182° distributed across **three visible
  gaps** between branches. Those gaps are the visual "cuts" that read
  as branch dividers; do not close them.
- Venture nodes within a branch: evenly distributed across the arc.
- Card distance from ring: `cardR = R + 62`. Label distance: `R + 175`.
  These two layers must not collide; if you change `R`, scale both.
- Background: `dotgrid` pattern (28px) at 0.45 opacity + a soft radial
  `centerGlow` behind the hub. Both are decorative — keep them low contrast.

---

## 3. The interaction model

There are exactly **three states**:

### A. Idle (no branch focused)

- All three arcs visible at coral-50% opacity.
- 3 traveler dots circulate along each branch arc (5.4s loop, staggered).
- The dotted ring slowly drifts (1.2°/s).
- All 8 venture cards visible, full color.
- Hub shows just the Niche logo.
- Header (eyebrow + H1 + lede) at full opacity.

### B. Hover on a branch label

- That arc's stroke thickens slightly (1.4 → 2).
- Travelers on that branch speed up to 3.6s loop.
- A dashed hairline appears from hub to arc midpoint with a pulsing dot
  traveling outward (the "preview" cue).
- Other branches unchanged.
- "Click to explore →" hint fades in beneath the hovered label.

### C. Focused on a branch

- That branch's arc renders solid, full coral.
- Travelers jump from 3 → 5, speed up to 2.2s loop, gain a soft halo trail.
- Branch label scales to 1.25×; ventures on that branch scale to 1.15×.
- All other branches: travelers fade to 0, label/cards dim to 30% opacity,
  cards shrink to 0.92×.
- Header dims to 40% opacity and is non-interactive.
- Hub scales to 0.88× and shows "← BACK TO MAP" beneath the logo.
- Description panel slides up from the bottom with the branch's full
  2-sentence description, branch number, label, and venture count.

### Closing the focused state

All four paths must work and resolve to state A within 500ms:
1. Click the × button in the description panel.
2. Press `Esc`.
3. Click anywhere on the empty page background (handled by the stage's
   `e.target === e.currentTarget` check).
4. Click the hub.

---

## 4. Animation reference (don't break these timings)

| Element | Property | Duration | Easing |
|---|---|---|---|
| Branch label scale | `transform` | 600ms | `cubic-bezier(0.34, 1.2, 0.64, 1)` |
| Venture card scale + opacity | `transform`, `opacity` | 500ms | same overshoot |
| Arc stroke + opacity | `all` | 500ms | `ease` |
| Traveler dots (idle) | `animateMotion` | 5.4s | linear (SVG default) |
| Traveler dots (hover) | `animateMotion` | 3.6s | linear |
| Traveler dots (focus) | `animateMotion` | 2.2s | linear |
| Description panel | `transform` + `opacity` | 500ms | overshoot |
| Header dim | `opacity` | 600ms | `ease` |
| Ring drift | continuous rotate | 1.2°/s | linear, paused on focus |

The overshoot easing `cubic-bezier(0.34, 1.2, 0.64, 1)` is the signature
"settle" — use it for any state transition the user initiates.

---

## 5. Editing content

All copy lives in **`data.jsx`**. Don't edit copy in `constellation.jsx`.

```js
NICHE_DATA = {
  headline, kicker, lede,
  branches: [
    {
      id: "ecosystem" | "community" | "acquisitions",  // matches branchCenters
      label, number, tagline, description,
      nodes: [{ name, role, note }, ...]               // 1–3 items
    }, ...
  ]
}
```

Constraints:
- **Branch IDs** are referenced in `branchCenters` inside `constellation.jsx`.
  Renaming requires editing both files.
- **Node count per branch**: 1, 2, or 3. The arc-spread function
  (`arcSpread`) returns 0 / 38° / 70° respectively. For 4+ nodes, extend
  that function (e.g. 95° for 4) and verify cards don't collide.
- **Venture name length**: ≤ 20 chars or it wraps in the 138px card.
- **Tagline length**: ≤ 36 chars on one line. Wrapping is allowed but
  the label area assumes ≤ 2 lines.
- **Description length**: 2 sentences, 30–55 words total. The panel grows
  but past ~80 words the bottom legend becomes cramped on small screens.

---

## 6. Component map (`constellation.jsx`)

| Component | Lines | Responsibility |
|---|---|---|
| `Constellation` | 1–370 | Orchestrator. Owns `focused` + `hovered` state, viewport sizing, ambient drift loop, Esc handler. Renders the SVG diagram + overlays. |
| `ArcCap` | 372–390 | Small perpendicular tick at each arc's start/end — makes the gaps between branches read as intentional dividers. |
| `HubOverlay` | 392–423 | Center logo. Click handler routes to "close focus" when active. |
| `BranchLabel` | 425–540 | Number + label + tagline tile, positioned outside the ring. Owns hover and click. |
| `VentureCard` | 542–605 | Per-venture name + role, anchored on the ring. Static — no interaction beyond `stopPropagation`. |
| `DescriptionPanel` | 607–740 | Bottom-fixed panel. `shown` state preserves content during the 500ms exit animation so text doesn't disappear early. |
| `polarToCartesian` / `describeArc` | 742–760 | SVG arc helpers. Standard formula — don't replace with d3 unless you also need d3 elsewhere. |

---

## 7. Responsive behavior

The `isMobile = viewport.w < 720` switch adjusts:
- Ring radius (`R: 270 → 240`)
- Card width (`138 → 110`), font sizes (1–3px down)
- Label width (`230 → 200`), label distance (`R+175 → R+130`)
- Panel max-width (`560 → 420`), padding

There is no separate mobile layout — same orbital, just compressed.
On screens narrower than ≈ 480px the cards may visually crowd; that is
acceptable for a presentation artifact. If this becomes a real product
surface, consider a stacked list view below `< 600px`.

---

## 8. Accessibility checklist

The current artifact is **presentation-grade, not WCAG-grade**. To ship to
end users:

- [ ] Add `role="button"` + `tabIndex={0}` + Enter/Space handlers to
      `BranchLabel` (currently only mouse-clickable).
- [ ] Add a focus ring style for keyboard navigation (currently none).
- [ ] Wrap the SVG in `role="img"` with an `<title>` describing the diagram.
- [ ] The traveler dots animation runs continuously — respect
      `prefers-reduced-motion` by pausing the `<animateMotion>` elements
      and the ring drift loop.
- [ ] The × button has `aria-label="Close"` already; verify Esc focuses
      the previously-active branch label after closing.

---

## 9. What this artifact is **not**

- Not a router or multi-page site. Single HTML file, single component tree.
- Not connected to a backend. All copy is in `data.jsx`.
- Not theme-able beyond the CSS tokens. Dark mode would need a new
  paper/ink scale; the coral works on warm paper, less well on dark.
- Not internationalized. All strings are inline English.

---

## 10. Likely follow-on work

If the user asks Claude Code to extend this, the highest-value next steps:

1. **Per-venture detail panels.** Right now ventures are static labels.
   A click could open a smaller panel (different shape from the branch
   panel, e.g. side rail) with the venture's `note` field expanded into
   real product copy.
2. **Embeddable widget.** Wrap the `<Constellation>` mount in a custom
   element so it can be dropped into a marketing site as
   `<niche-ecosystem-map>`.
3. **Print/export.** Add a "save as PDF" path that renders the
   focused-state for each branch as a separate page.
4. **Real CMS.** Move `NICHE_DATA` to a JSON file fetched at runtime, or
   to a headless CMS. Keep the schema identical to section 5.

When you build any of these, **preserve the geometry constants and the
coral-on-paper palette**. Those are the brand. Everything else is fair game.
