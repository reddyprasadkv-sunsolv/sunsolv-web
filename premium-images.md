# SunSolv premium hero images

Created 20 September 2026 using the built-in image generation tool. Digital Marketing supplied the visual direction; its existing artwork remains unchanged. No people, text, logos or factual client-result claims are rendered in the new images.

## Assets

- IT Consulting: `public/images/services/it-consulting/sunsolv-it-consulting-premium.webp`
- Digital Transformation: `public/images/services/digital-transformation/sunsolv-digital-transformation-premium.webp`
- Cloud Solutions: `public/images/services/cloud-solutions/sunsolv-cloud-solutions-premium.webp`
- Web & Mobile Development: `public/images/services/web-mobile-development/sunsolv-web-mobile-premium.webp`
- Case Studies: `public/images/case-studies/sunsolv-case-studies-premium.webp`

Each asset has a desktop AVIF/WebP pair at 1400×900 and a mobile AVIF/WebP pair at 1000×750. Mobile framing favors the sculpture on the right. Original generated PNGs are retained in ignored `qa/premium-originals` for future exports.

## Final generation prompts

### it-consulting

Use case: stylized-concept. Create a premium photorealistic architectural 3D installation for a SunSolv enterprise technology website hero, landscape 1536x1024. Art direction inspired by luxury sculptural installations: brushed dark titanium, optical glass, refined illuminated cyan/blue paths and restrained warm amber accents, deep midnight navy gallery, realistic reflections, cinematic lighting, exceptional material detail. Composition: left 48% extremely dark uncluttered negative space reserved for white website heading and paragraph (do not render any text); distinctive sculpture mostly within right 50%, with margins around it, fully in frame. No humans, faces, hands, robots, humanoids, typography, lettering, logos, watermark, UI labels, stock-photo office scenes, or excessive neon. Subject: a strategic technology architecture sculpture: a precise array of translucent glass modules on a dark architectural planning plinth, interconnected by elegant cyan light channels converging on a single warm amber core. Order, clarity and considered direction; NOT a city skyline.

### digital-transformation

Use case: stylized-concept. Create a premium photorealistic architectural 3D installation for a SunSolv enterprise technology website hero, landscape 1536x1024. Art direction inspired by luxury sculptural installations: brushed dark titanium, optical glass, refined illuminated cyan/blue paths and restrained warm amber accents, deep midnight navy gallery, realistic reflections, cinematic lighting, exceptional material detail. Composition: left 48% extremely dark uncluttered negative space reserved for white website heading and paragraph (do not render any text); distinctive sculpture mostly within right 50%, with margins around it, fully in frame. No humans, faces, hands, robots, humanoids, typography, lettering, logos, watermark, UI labels, stock-photo office scenes, or excessive neon. Subject: a physical sculptural transformation from orderly solid titanium cuboids into an elegantly unfolding flowing ribbon of connected luminous glass tiles, a deliberate transition from rigid old systems to fluid connected modern architecture. Cohesive single installation, not a particle explosion.

### cloud-solutions

Use case: stylized-concept. Create a premium photorealistic architectural 3D installation for a SunSolv enterprise technology website hero, landscape 1536x1024. Art direction inspired by luxury sculptural installations: brushed dark titanium, optical glass, refined illuminated cyan/blue paths and restrained warm amber accents, deep midnight navy gallery, realistic reflections, cinematic lighting, exceptional material detail. Composition: left 48% extremely dark uncluttered negative space reserved for white website heading and paragraph (do not render any text); distinctive sculpture mostly within right 50%, with margins around it, fully in frame. No humans, faces, hands, robots, humanoids, typography, lettering, logos, watermark, UI labels, stock-photo office scenes, or excessive neon. Subject: an ethereal floating layered glass canopy held visually above three sculptural dark metal server monoliths by delicate luminous cyan connection strands. A premium abstract cloud infrastructure installation expressing resilience and connectivity, no literal cartoon cloud.

### web-mobile-development

Use case: stylized-concept. Create a premium photorealistic architectural 3D installation for a SunSolv enterprise technology website hero, landscape 1536x1024. Art direction inspired by luxury sculptural installations: brushed dark titanium, optical glass, refined illuminated cyan/blue paths and restrained warm amber accents, deep midnight navy gallery, realistic reflections, cinematic lighting, exceptional material detail. Composition: left 48% extremely dark uncluttered negative space reserved for white website heading and paragraph (do not render any text); distinctive sculpture mostly within right 50%, with margins around it, fully in frame. No humans, faces, hands, robots, humanoids, typography, lettering, logos, watermark, UI labels, stock-photo office scenes, or excessive neon. Subject: a refined architectural product sculpture of three elegant frameless smoked-glass rectangular panels of desktop, tablet and phone proportions, arranged with depth on polished dark stone. Subtle unlabeled modular interface geometry within the glass and cyan light pathways connecting the screens; no text, no app icons, no humans.

### case-studies

Use case: stylized-concept. Create a premium photorealistic architectural 3D installation for a SunSolv enterprise technology website hero, landscape 1536x1024. Art direction inspired by luxury sculptural installations: brushed dark titanium, optical glass, refined illuminated cyan/blue paths and restrained warm amber accents, deep midnight navy gallery, realistic reflections, cinematic lighting, exceptional material detail. Composition: left 48% extremely dark uncluttered negative space reserved for white website heading and paragraph (do not render any text); distinctive sculpture mostly within right 50%, with margins around it, fully in frame. No humans, faces, hands, robots, humanoids, typography, lettering, logos, watermark, UI labels, stock-photo office scenes, or excessive neon. Subject: three distinct refined glass and titanium architectural models on stepped display plinths linked by one luminous amber path, representing completed digital projects and tangible outcomes. Gallery exhibition quality, restrained cyan accents, confident monumental composition, no charts or claims.


## Verification

- Production build passed with all 23 routes prerendered.
- Existing service-detail tests updated for the new image filenames and alt text: 27 passed.
- Desktop screenshots inspected for all four services and Case Studies.
- All five routes select their mobile AVIF at 390px; none has horizontal overflow. Case Studies mobile framing inspected visually.
- Desktop image alignment preserves the tops of the new sculptures. Existing Digital Marketing and other service assets remain unchanged.
- `git diff --check` passed. Desktop AVIF files are 44–60 KB; mobile AVIF files are 31–43 KB.
