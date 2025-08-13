# ngx-highlighter

<a href="https://ngxui.com" target="_blank" style="display: flex;gap: .5rem;align-items: center;cursor: pointer; padding: 0; height: fit-content;">
  <img src="https://ngxui.com/assets/img/ngxui-logo.png" style="width: 64px;height: 64px;">
</a>

This library is part of the NGXUI ecosystem.
View all available components at [https://ngxui.com](https://ngxui.com)

`@omnedia/ngx-highlighter` is an Angular library for applying animated highlights and annotations to text or elements using [rough-notation](https://roughnotation.com/). It supports multiple annotation types, customizable colors, padding, stroke widths, and animation settings, with automatic triggering via IntersectionObserver.

---

## Features

* Multiple annotation styles: highlight, underline, box, circle, strike-through, crossed-off, bracket.
* Customizable color, stroke width, padding, animation duration, and iterations.
* Optional multiline support.
* Automatic start/stop of animations when element enters/leaves the viewport.
* Option to animate only once.
* Works as a standalone Angular component with `ng-content`.

---

## Installation

```bash
npm install @omnedia/ngx-highlighter rough-notation
```

---

## Usage

Import the `NgxHighlighterComponent` in your Angular component or page:

```typescript
import {NgxHighlighterComponent} from '@omnedia/ngx-highlighter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxHighlighterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
}
```

In your template:

```html

<om-highlighter [color]="'#ffeb3b'" [action]="'underline'">
  Highlight this text when in view.
</om-highlighter>
```

---

## How It Works

* The component wraps its content in a `<span>` element.
* [rough-notation](https://roughnotation.com/) is used to draw annotations.
* IntersectionObserver detects when the element enters/leaves the viewport.
* The animation plays when in view and stops (or hides) when out of view.
* Optionally, it can run only once using `animateOnlyOnce`.

---

## API

```html

<om-highlighter
  [action]="'highlight'"
  [color]="'#d1daff'"
  [strokeWidth]="1.5"
  [animationDuration]="600"
  [iterations]="2"
  [padding]="2"
  [multiline]="true"
  [animateOnlyOnce]="false"
  [brackets]="['left', 'right']"
  [animate]="true"
>
  <ng-content></ng-content>
</om-highlighter>
```

### Inputs & Defaults

* `action` — **'highlight'** — Annotation type.
* `color` — **'#d1daff'** — Annotation color.
* `strokeWidth` — **1.5** — Width of annotation strokes.
* `animationDuration` — **600** — Animation duration in ms.
* `iterations` — **2** — Number of animation repeats.
* `padding` — **2** — Padding around content in pixels.
* `multiline` — **true** — Allows annotation to span multiple lines.
* `animateOnlyOnce` — **false** — If true, animation runs only once when first in view.
* `brackets` — **['left', 'right']** — If action is set to `bracket` you can define them here.
* `animate` — **true** — If set to false, there will be no animation.

---

## Example

```html

<om-highlighter
  [color]="'#ff5555'"
  [action]="'box'"
  [strokeWidth]="2"
  [animationDuration]="800"
  [iterations]="3"
>
  Important content here!
</om-highlighter>
```

**SCSS:**

```scss
:host {
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
}
```

---

## Contributing

Contributions are welcome via PR or issue submission.

## License

MIT License
