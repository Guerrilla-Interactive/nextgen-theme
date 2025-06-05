## Step 1 — Inventory What You Already Have

You don’t need anything new to get started. Collect these existing brand assets:

* **Brand manual**
* **Logo**
* **Fonts**
* **Colour palette**

---

## Default influence hierarchy

| Rank | Role token                                                                                                                               | Points |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- | :----: |
| 1    | `primary`                                                                                                                                | **10** |
| 2    | `background`, `foreground`                                                                                                               |  **9** |
| 3    | `secondary`                                                                                                                              |  **8** |
| 4    | `border`, `input`                                                                                                                        |  **7** |
| 5    | `ring`                                                                                                                                   |  **6** |
| 6    | `destructive`                                                                                                                            |  **5** |
| 7    | `success`, `warning`, `info`, `muted`, `muted-foreground`                                                                                |  **4** |
| 8    | `accent`                                                                                                                                 |  **3** |
| 9    | Shared-surface roles – `card`, `popover`, `nav`, `hero-background`, `tooltip-background`, `surface-muted`, `text-brand`, `chart-outline` |  **2** |
| 10   | Component-specific / decorative – `chart-n`, `shadow-*`, `badge-*`, `button-*`, etc.                                                     |  **1** |

### Brand Definition (JSON)

```jsonc
{
  "brand": {
    "businessDetails": { /* … */ },
    "colors": [
      {
        "name": "nextgen-orange",
        "hex": "#FF3600",
        "shades": {
          "50":  { "color": "color-mix(in srgb, var(--brand-nextgen-orange-primary) 5%,  white)", "variableName": "brand-nextgen-orange-50"  },
          "100": { "color": "color-mix(in srgb, var(--brand-nextgen-orange-primary) 10%, white)", "variableName": "brand-orange-100" },
          "200": { "color": "color-mix(in srgb, var(--brand-orange-primary) 20%, white)", "variableName": "brand-orange-200" },
          "300": { "color": "color-mix(in srgb, var(--brand-orange-primary) 30%, white)", "variableName": "brand-orange-300" },
          "400": { "color": "color-mix(in srgb, var(--brand-orange-primary) 40%, white)", "variableName": "brand-orange-400" },
          "500": { "color": "var(--brand-orange-primary)",                               "variableName": "brand-orange-500" },
          "600": { "color": "color-mix(in srgb, var(--brand-orange-primary) 60%, white)", "variableName": "brand-orange-600" },
          "700": { "color": "color-mix(in srgb, var(--brand-orange-primary) 70%, white)", "variableName": "brand-orange-700" },
          "800": { "color": "color-mix(in srgb, var(--brand-orange-primary) 80%, white)", "variableName": "brand-orange-800" },
          "900": { "color": "color-mix(in srgb, var(--brand-orange-primary) 90%, white)", "variableName": "brand-orange-900" }
        }
      }
    ],

    "fonts": { /* … */ }
  }
}
```

---

## Step 2 — Map Your Brand Personality

Use the positive, picture‑rich slider pairs below to clarify the emotional territory of your brand. Decide where you sit on each spectrum; the farther you lean, the more strongly those traits will show up in design and tone.

| Slider                  | Left vision → Right vision              |
| ----------------------- | --------------------------------------- |
| Vintage ↔ Modern        | **Vintage Postcard → Smartwatch**       |
| Seasoned ↔ Youthful     | **Fine Wine → Sparkling Lemonade**      |
| Graceful ↔ Bold         | **Silk Ribbon → Steel Gear**            |
| Playful ↔ Elegant       | **Colorful Kite → Black Tuxedo**        |
| Value-smart ↔ Luxurious | **Canvas Backpack → Leather Weekender** |
| Structured ↔ Natural    | **Lego Bricks → River Pebbles**         |
| Symbolic ↔ Realistic    | **Dreamy Watercolor → HD Photograph**   |

### How Each Slider Shapes Your Look & Feel

| Slider                      | If you lean LEFT …                                                      | If you lean RIGHT …                                                           | Design cues that signal the shift                                                                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vintage ↔ Modern**        | Evokes heritage, nostalgia, craftsmanship—feels stable and time‑tested. | Suggests innovation, progress, forward‑thinking—feels current and tech‑savvy. | **Vintage:** serif or script fonts, muted palettes, textured papers, classic patterns.<br>**Modern:** clean sans‑serifs, high‑contrast or monochrome palettes, flat icons, minimalist layouts.                       |
| **Seasoned ↔ Youthful**     | Conveys wisdom, refinement, reliability.                                | Radiates energy, spontaneity, approachability.                                | **Seasoned:** measured copy, deeper tones, generous whitespace, elegant photography.<br>**Youthful:** punchy headlines, bright colors, dynamic motion graphics, playful illustrations.                               |
| **Graceful ↔ Bold**         | Communicates softness, elegance, warmth.                                | Signals strength, confidence, assertiveness.                                  | **Graceful:** flowing shapes, fine lines, pastel gradients, rounded corners.<br>**Bold:** blocky geometry, thick strokes, vivid primaries, angular edges.                                                            |
| **Playful ↔ Elegant**       | Sparks joy and creativity; feels casual and fun.                        | Inspires respect and admiration; feels polished and upscale.                  | **Playful:** hand‑drawn doodles, whimsical icons, lively patterns, animated micro‑interactions.<br>**Elegant:** restrained color schemes, high‑quality photography, luxury materials (foil, emboss), balanced grids. |
| **Value-smart ↔ Luxurious** | Highlights practicality, affordability, savvy choices.                  | Emphasizes indulgence, exclusivity, premium quality.                          | **Value-smart:** clear price tags, friendly typography, approachable imagery, simple packaging.<br>**Luxurious:** rich textures, metallic accents, slower pacing in videos, unboxing theatrics.                      |
| **Structured ↔ Natural**    | Feels orderly, engineered, predictable.                                 | Feels organic, flowing, human‑centered.                                       | **Structured:** grid‑based layouts, sharp shapes, repeating motifs, technical diagrams.<br>**Natural:** asymmetry, earthy palettes, hand‑torn edges, photography of real environments.                               |
| **Symbolic ↔ Realistic**    | Invites interpretation, storytelling, imagination.                      | Provides clarity, detail, literal meaning.                                    | **Symbolic:** abstract logos, metaphoric taglines, conceptual graphics, gradient washes.<br>**Realistic:** product close‑ups, straightforward messaging, photographic textures, infographics with concrete numbers.  |

---

### Putting the Sliders to Work

1. **Pick your home positions.** Decide where on each spectrum you naturally sit. That set becomes your brand’s core atmosphere.
2. **Dial for campaigns.** For a seasonal promo you might slide slightly toward *Playful* or *Luxurious* while keeping the others fixed, giving you fresh flair without losing brand consistency.
3. **Check for harmony.** Extreme positions on every slider can clash (e.g., Vintage *and* Ultra‑Lux *and* Youthful may feel mismatched). View the set as a whole to ensure a coherent story.
4. **Build a style guide.** Translate each chosen position into tangible rules: font stacks, color values, imagery do’s & don’ts, voice and tone guidelines.
5. **Test with users.** Show mock‑ups that reflect different slider positions; gather feedback on the emotional impact to confirm you’re evoking the intended feelings.

With these two steps—inventorying your assets and mapping your personality—you’re ready to craft brand guidelines that are both visually coherent and emotionally on‑target.
