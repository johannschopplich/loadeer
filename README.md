<p align="center">
  <img src="./.github/icon.svg" alt="Loadeer.js Logo" width="180" height="180">
</p>

<h3 align="center">Loadeer.js</h3>

<p align="center">
  Tiny, performant, SEO-friendly lazy loading library<br>
</p>

<br>

> **Note**
>
> It's 2023 – by now most browsers support native lazy loading with `loading="lazy"`. If you're looking for a library that combines native lazy loading with blurry placeholder support, I recommend [unlazy](https://github.com/johannschopplich/unlazy). It's the spiritual successor of Loadeer.js.
>
> [unlazy](https://github.com/johannschopplich/unlazy) has a smaller footprint and doesn't require an Intersection Observer. I recommend using it instead of Loadeer.js.

## Loadeer.js

If you have used [Lozad.js](https://github.com/ApoorvSaxena/lozad.js), then you already know how to use Loadeer.js. This library is basically an overhauled and opinionated version of Lozad.js, which includes `sizes` support, makes usage of `data` attributes instead of classes and is written in TypeScript.

Loadeer.js is intended to be used with `<img>`, `<picture>` and `<video>` tags. It supports the `srcset` and `sizes` attributes, as well as the `loading` attribute. It is also possible to use the `data` attributes instead of the native attributes.

### Key Features

- 🍃 **Zero dependencies**: 1 kB minified & gzipped
- 🏎 **Auto initialize**: with the `init` script attribute
- 🪄 **Sizing**: Automatically calculates the `sizes` attribute
- 🎀 **Native**: Use [native `loading="lazy"`](#native-lazy-loading) if you prefer
- 🔧 **Customizable**: Use `data` attributes for image sources
- 🎟 **`<picture>`**: Supports multiple image formats
- 🔍 **SEO-friendly**: Detects e.g. Google Bot and preloads all images

## Installation

Loadeer.js can be used without a build step. Simply load it from a CDN:

```html
<script src="https://unpkg.com/loadeer" defer init></script>

<!-- Anywhere on the page -->
<img
  data-lazyload
  data-srcset="/foo.png 1024w, /foo-2x.png 2048w"
/>

<!-- Or use the picture tag instead -->
<picture>
  <source data-lazyload data-srcset="/bar.jpg" media="(min-width: 800px)">
</picture>
```

- The `defer` attribute makes the script execute after HTML content is parsed.
- The `init` attribute tells Loadeer.js to automatically initialize and watch all elements that have a `data-lazyload` attribute.

### Manual Initialization

If you don't want the auto initialize, remove the `init` attribute and move the scripts to end of `<body>`:

```html
<script src="https://unpkg.com/loadeer"></script>
<script>
  const loadeer = new Loadeer()
  loadeer.observe()
</script>
```

Or, use the ES module build by installing the [`loadeer` npm package](https://www.npmjs.com/package/loadeer):

```js
import Loadeer from 'loadeer'

const loadeer = new Loadeer()
loadeer.observe()
```

### Production CDN URLs

The short CDN URLs are meant for prototyping. For production usage, use a fully resolved CDN URL to avoid resolving and redirect cost:

- Global build: https://unpkg.com/loadeer@2.1.3/dist/loadeer.iife.js
  - Exposes `Loadeer` global property, supports auto initializing
- ESM build: https://unpkg.com/loadeer@2.1.3/dist/loadeer.es.js
  - Must be used with `<script type="module">`

## Usage

### Basic

Add the `data-lazyload` attribute to an element of your choice which you seek to lazily load. Set a `data-src` or `data-srcset` attribute as well.

```html
<!-- You can use the img tag -->
<img data-lazyload data-src="image.png" />

<!-- … or the picture element -->
<picture>
  <source data-lazyload data-srcset="/foo.jpg" media="(min-width: 800px)">
</picture>
```

Although Loadeer.js' default selector is `data-lazyload`, you may configure it to a selector of your choice. See the libraries options for more information.

Finally, instantiate Loadeer.js as follows:

```js
const instance = new Loadeer()
// Lazily loads all `data-lazyload` images
instance.observe()
```

### Native Lazy Loading

> **Note**
>
> Use with caution. Especially if placeholder images are used, the native lazy loading attribute interferes, since all `data-src` attributes will be converted to `src` once Loadeer.js runs. All placeholder images will be overwritten and if the images are loaded slower than the user scrolls, blank spaces will occur. Thus, Loadeer.js doesn't enable native lazy loading by default.

Browser support for `loading="lazy"` is decent. At the time writing, only Safari lacks support. If the option `useNativeLoading` is set to `true` and Loadeer.js detects the browser supports lazy loading, the `loading` attribute will be set to `lazy` and all `data-src` attributes changed to `src`. No intersection observer will be initialized.

Use the default selector:

```html
<img data-lazyload data-src="image.png" />
```

Or use the future-proof `loading` attribute as selector:

```html
<img loading="lazy" data-src="image.png" />
```

Finally, change the default selector parameter for the latter case:

```js
const instance = new Loadeer('img[loading="lazy"]')
instance.observe()
```

### Auto Calculation of the `sizes` Attribute

Loadeer.js supports setting the sizes attribute automatically, corresponding to the current size of your image – just set the value of `data-sizes` to `auto`.

The automatic sizes calculation uses the display width of the image.

```html
<img
  data-lazyload
  data-srcset="image-480w.jpg 480w, image-800w.jpg 800w"
  data-sizes="auto"
/>
```

### Custom Selector

You may pass an element or array of elements to the constructor as well:

```js
const root = document.querySelector('#app')
const instance = new Loadeer(root)
instance.observe()
```

See the [API](#api) for all available options.

### Trigger Loading of Images Manually

If you want to load the images before they appear, use the `triggerLoad` method.

```js
const instance = new Loadeer()
instance.observe()

const coolImage = document.querySelector('.image-to-load-first')
// Trigger the load before the image appears in the viewport
observer.triggerLoad(coolImage)
```

### Custom Options

Pass a `onLoaded` function to either manipulate the loaded element or do anything else with it.

```js
function onLoaded(element) {
  console.log('Lazily loaded element:', element)
}

const instance = new Loadeer('[data-lazyload]', {
  root: document.querySelector('#app'),
  rootMargin: '10px 0px',
  threshold: 0.1,
  onLoaded,
})

instance.observe()
```

Both the [`rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) and [`thresholds`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds) options are passed to directly to the `IntersectionObserver` and thus infer their respective types.

## API

### `new Loadeer(selector, options: LoadeerOptions = {})`

#### `Selector`

Defaults to `[data-lazyload]`. Allowed types are every valid CSS selector string, an element, an array of elements, or a `NodeListOf` elements:

```ts
type LoadeerElement = HTMLImageElement | HTMLSourceElement | HTMLVideoElement

type LoadeerInput<T extends HTMLElement> =
  | string
  | T
  | T[]
  | NodeListOf<T>
```

#### `LoadeerOptions`

> Note: Every property is optional and will be set to its default value if not provided.

| Option             | Default     | Type                                          | Description                                                                                                                                      |
| ------------------ | ----------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `root`             | `document`  | `Element`, `Document`, `null`, `undefined`    | The container within elements will be lazily loaded.                                                                                             |
| `rootMargin`       | `0px`       | `string`, `undefined`                         | See `IntersectionObserver` [`rootMargin` parameter](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver). |
| `threshold`        | `0`         | `number`, `number[]`, `undefined`             | See `IntersectionObserver` [`threshold` parameter](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver).  |
| `onLoaded`         | `undefined` | `(element: HTMLElement) => void`, `undefined` | Custom function to run after each image is loaded.                                                                                               |
| `useNativeLoading` | `false`     | `boolean`, `undefined`                        | Indicates if the native `loading="lazy"` attribute should be used (if supported by the browser).                                                 |

## Cookbook

### Animated Blurry Placeholder with GSAP

A fellow Kirby developer ([Thomas Günther](https://github.com/medienbaecker)) using Loadeer.js in a project of his came up with a nice idea to use a blurry placeholder image with a blurred version of the actual image. The code below will create a smooth animation effect for the image placeholders, transitioning from a blurry state to the fully loaded image, using the powerful GSAP library for animations.

👉 [Animate blurry-placeholder with Loadeer and GSAP on CodePen](https://codepen.io/medienbaecker/pen/yLEMdoN)

## SEO

Loadeer.js does not hide elements from Google. The library detects whether the user agent is probably a bot or crawler and will load all images.

## Credits

- [Lozad.js](https://github.com/ApoorvSaxena/lozad.js) for heavy inspiration.

## License

[MIT](./LICENSE) License © 2021-2023 [Johann Schopplich](https://github.com/johannschopplich)
