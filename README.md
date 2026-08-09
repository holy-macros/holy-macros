# Holy Macros V3

This is the production-style V3 site structure for the Holy Macros Vercel deployment.

## Files

- `index.html` — homepage
- `recipes/protein-banana-bread.html` — first completed recipe page
- `css/style.css` — shared styling for the whole site
- `js/script.js` — shared navigation, filtering, Pinterest, and social sharing behavior
- `assets/logo.png` — cropped copy of the uploaded Holy Macros logo

## Upload to GitHub

Upload the CONTENTS of this folder to the root of your existing `holy-macros/holy-macros` repository.

After uploading, the repository should contain:

```text
assets/
css/
js/
recipes/
index.html
README.md
```

Your old root-level `style.css` and `script.js` are no longer used by V3 and can be deleted after you confirm the new deployment works.

Because your repository is connected to Vercel, committing these changes should trigger a new deployment automatically.

## Adding food photography later

For the banana bread page, replace the `.photo-placeholder.recipe-hero-media` block with:

```html
<img
  class="recipe-hero-image"
  src="../assets/protein-banana-bread.jpg"
  alt="Protein Banana Bread"
/>
```

Then upload the photograph as `assets/protein-banana-bread.jpg`.

The Pinterest `Pin` button will automatically use `.recipe-hero-image` once an image is present.
