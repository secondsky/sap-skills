# SAC Custom Widget CSS and Styling Compliance

Official Sources:
- SAP Analytics Cloud Custom Widget Developer Guide PDF: https://help.sap.com/doc/c813a28922b54e50bd2a307b099787dc/release/en-US/CustomWidgetDevGuide_en.pdf
- SAP Help, Custom Widget Developer Guide: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/75311f67527c41638ceb89af9cd8af3e.html
- SAP Help, Hosting Custom Widgets: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/e983213a29554afb9700905ec0beb3d3.html
- SAP Help, Restrictions: https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/0ac8c6754ff84605a4372468d002f2bf/04517575148b4fb38d63d2f60ba33519.html
- SAP Help, Customize Themes Using CSS (Optimized): https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/18850a0e13944f53aa8a8b7c094ea29e/d88cef19811e4599b58a970b073fc17b.html

Use this reference when generating or reviewing visual styling for SAC custom widgets. Treat it as SAC compatibility guidance for generated packages, not as a ban on expert hand-written CSS inside a Web Component.

## Key Distinction

SAP documents both of these facts:

- Custom widget resource files can include CSS, HTML, JavaScript, images, and related static files when they are hosted as custom-widget resources.
- The custom widget restrictions list "Theme and CSS" as unsupported for custom widgets.

For generated widgets, interpret this as follows: style the widget inside its own Web Component boundary, but do not rely on SAC optimized story theme CSS, global story CSS classes, or SAP shell DOM selectors to style custom-widget internals.

Optimized story theme CSS is a separate SAC feature for story, page, popup, and standard-widget theming. It can conform to CSS standards, but generated custom widgets should remain self-contained and should not require story CSS to render correctly.

## Allowed and Recommended

- Put widget styling inside the Web Component template or another Shadow DOM-scoped mechanism.
- Use `:host` for the custom element container and set stable SAC sizing defaults:

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
```

- Use responsive internal layout with `width: 100%`, `height: 100%`, `min-height: 0`, `box-sizing: border-box`, and overflow handling that does not hide critical data.
- Use SAP theme custom properties with safe fallbacks where they preserve the intended design, for example `var(--sapFontFamily, "72", Arial, sans-serif)` and `var(--sapTextColor, #1d2d3e)`.
- Keep focus states visible, maintain readable contrast, and respect reduced-motion expectations for decorative animation.
- Load brand images, icons, fonts, and chart libraries only from SAC-hosted files, local package assets, or deployment-approved HTTPS origins.
- Use styling and builder panels as Web Components when users need design-time controls. Dispatch `propertiesChanged` from setters and keep visual state driven by manifest properties.

## Restricted or Avoid

- Do not depend on SAC story theme CSS to style the inside of a custom widget.
- Do not target SAP shell, story canvas, or undocumented SAC internal class names from generated widget CSS.
- Do not inject global styles into `document.head` to change SAC page or story behavior. Keep styles scoped to the widget.
- Do not generate remote `@import` rules, remote font imports, or CSS `url(http...)` assets unless the user explicitly approves the host and the deployment can serve the resource to SAC browsers.
- Do not reference assets that require authentication, authorization, session cookies, or tenant-local browser state. SAP documents custom-widget resource files as browser-requested static resources.
- Do not add tracking pixels, analytics beacons, credentials, or user-specific URLs for visual polish.
- Do not use fixed-only layouts that ignore SAC resize events or responsive story containers.
- Do not hide labels, focus outlines, legends, or data values only to achieve a decorative look.

## Hosting and Packaging Matrix

| Hosting mode | CSS and HTML guidance | Generated package rule |
| --- | --- | --- |
| External HTTPS/static server | Custom widget resource files can include JavaScript, CSS, HTML, images, and similar static files if the browser can request them. | External CSS/HTML resources are acceptable only when the host is approved, HTTPS, static, and accessible without session-only auth. |
| SAC-hosted resource files | Host resource files in SAC when available for the tenant. Keep manifest URLs as browser URL paths and use `/` separators. | Prefer self-contained JavaScript templates for generated packages unless the deployment owner confirms separate CSS/HTML hosting. |
| SAC ZIP resource upload | SAP documents the ZIP as limited to Web Component JavaScript for main/styling/builder plus PNG/JPG icon; no subfolders; CSS and HTML files are not supported in the ZIP. | Embed CSS inside the Web Component JavaScript template. Do not generate separate `.css` or `.html` files for ZIP upload packages. |

`webcomponents[].url` should point to the Web Component JavaScript file for `main`, `styling`, or `builder` components. Do not point a webcomponent URL directly at `.css` or `.html`.

## LLM Generation Checklist

Before returning a generated custom widget package:

- Confirm which hosting mode the user expects before splitting CSS into separate files.
- Keep the widget functional without any SAC story theme CSS.
- Keep all component CSS inside Shadow DOM or a clearly scoped Web Component style boundary.
- Use `:host` and responsive container CSS so SAC story resizing does not break the layout.
- Use SAP theme variables with fallbacks for text, background, focus, and semantic colors when compatible with the design.
- Keep brand assets and external libraries local or on approved HTTPS origins.
- If packaging for SAC ZIP upload, include only JavaScript component files and a PNG/JPG icon in the ZIP resource set.
- Validate that manifest `webcomponents[].url` values reference JavaScript component files and that integrity settings match the deployment mode.
