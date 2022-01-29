# Client chat room

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Links

- Live Site URL: [Link](https://trinhlehainam.github.io/learn-svg/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

### What I learned
- Use stroke dash to animate svg path line.

``` css
.path {
    stroke-dasharray: 800;
    stroke-dashoffset: -800;
    transition: ease 2s;
}

.path:hover{
    stroke-dashoffset: 0;
    stroke-dasharray: 800;
} 
```

- Use svg grandient element.

```html/ jsx
<svg>
    <defs>
        <radialGradient id="my-gradient">
            <stop offset="0%" stopColor="#e66465" />
            <stop offset="100%" stopColor="#9198e5" />
        </radialGradient>
    </defs>
...
</svg>
```

- Clip path and clip path animation.

```css
.fill {
    clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
    transition: ease-in-out 0.5s;
}

.btn-base:hover .fill {
    clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%);
}
```

- How to add custom font-face to React App with CSS. Need to move font files to src/fonts/ folder.

```css
@font-face {
    font-family: "Odinson";
    src: url("../fonts/Odinson.ttf") format('truetype');
    font-weight: normal;
}
```

- Avoid component's state from being used when component's destroyed (component's unmounted)

```jsx
useEffec(() => {
    let isMounted = true;

    promiseFunc()
    .then((res) => {
        // Only use this component's state when it's mounted
        if (isMounted) {
            setState(...);
        }
    })

    return () => { isMounted = false };
},[setState]);
```

- Use state as function in react by return a closure function in below.

```jsx
    // Init empty arrow function to func
    const [func, setFunc] = useState(() => () => { ... });

    useEffect(() => {

        setFunc(() => 
        // Update new function definition like below
        () => {
            ...
        } 

    },[setFunc]);
```

- Extract iterable values to array

```js
    // iterable can be [values(), entries(), keys()]
    const extracted_value = Array.from(value.iterable());
```

- React render object need to be and valid HTML or JSX Element object

```jsx
    // Invalid
    <Suspense fallback={ {} } >
    ...
    </Suspense>

    // Valid
    <Suspense fallback={ <div>HTML or JSX Elememt</div> } >
    ...
    </Suspense>
```

- Combine React memo with React lazy load

```jsx
    const Home = React.lazy(() => import(./Home));
    const MemoHome = React.memo(Home);

    <Suspense fallback={ <Loading /> } >
        <MemoHome />
    </Suspense>
```

- Replace React Router Routes to useMatch

```jsx
    // from
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
    </Routes>

    // to
    const isHome = useMatch('/');
    const isMenu = useMatch('/menu');
    
    ...
    {isHome && <Home />}
    {isMenu && <Menu />}
```

- Define component's key to help AnimatePresence handle component mount state

```jsx
    <AnimatePresence exitBeforeEnter>
        {isOn && <Component key={...} />}
        ...
    </AnimatePresence>
```

### Continued development

### Useful resources

- [svg line animation](https://css-tricks.com/svg-line-animation-works/) - This help to how to use animate svg line.
- [svg gradients](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients) - This help to how to fill gradient color in svg.
- [clipPath](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath) - This help to how to use clip-path to clip images.
- [clipPath Animation](https://css-playground.com/view/65/clipping-paths-with-clip-path) - This help to how to use animate clip-path in svg.
- [add custom font to react](https://blog.greenroots.info/3-quick-ways-to-add-fonts-to-your-react-app) - This help to how to add custom front to my React Project.
- [Scale SVG](https://css-tricks.com/scale-svg/) - This help to how to SVG and fit to div box.
- [Click through to underlying element](https://stackoverflow.com/questions/3680429/click-through-div-to-underlying-elements)
- [Wraping and break new line words](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Text/Wrapping_Text)
- [Understand React useEffect](https://medium.com/@dev_abhi/useeffect-what-when-and-how-95045bcf0f32)
- [React Router](https://ui.dev/react-router-tutorial/)
- [Protected route React Router](https://ui.dev/react-router-protected-routes-authentication/)
- [React Router v6](https://ui.dev/react-router-tutorial/)
- [React useCallback](https://dmitripavlutin.com/dont-overuse-react-usecallback/)
- [React useEffect vs useCallback vs useMemo](https://stackoverflow.com/questions/56910036/when-to-use-usecallback-usememo-and-useeffect)
- [React scroll to bottom in overflow box](https://stackoverflow.com/questions/45719909/scroll-to-bottom-of-an-overflowing-div-in-react)
- [React rerendering](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/)
- [Avoid use component's state when it's unmounted](https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component)
- [Use state as function is react](https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react)

## Author

- GitHub - [@trinhlehainam](https://github.com/trinhlehainam)
- Twitter - [@namtrile](https://www.twitter.com/namtrile)

## Acknowledgments
