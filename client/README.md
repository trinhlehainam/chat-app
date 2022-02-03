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

- Avoid component's state from being used when component's destroyed (component's unmounted).

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

- Extract iterable values to Array (for Javascript version older than ES6) or enable downlevelIteration flag in tsconfig.json file to help Typescript compile to version older than ES6.

```js
    // iterable can be [values(), entries(), keys()]
    const extracted_value = Array.from(map.iterable());

    // ES6
    for (const value of map.values()) {
        ...
    }
```

```json
{
    "compilerOptions": {
        ...
        "downlevelIteration": true
    },
    ...
}
```

- React render object need to be and valid HTML or JSX Element object.

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

- Combine React memo with React lazy load.

```jsx
    const Home = React.lazy(() => import(./Home));
    const MemoHome = React.memo(Home);

    <Suspense fallback={ <Loading /> } >
        <MemoHome />
    </Suspense>
```

- Replace React Router Routes to useMatch.

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

- Define component's key to help AnimatePresence handle component mount state.

```jsx
    <AnimatePresence exitBeforeEnter>
        {isOn && <Component key={...} />}
        ...
    </AnimatePresence>
```

- Fetch data with React Suspense and useState.

```ts
    // fetchData.ts
    export interface FetchResource_t {
        read(): Data_t | undefine;
    }
    
    function wrapPromise(promise) {
        let status = 'pending';
        let result: Data | undefine;
        let error: any;

        const suspense = promise.then(
            r => {
                status = 'success';
                kresult = r;
            },
            e => {
                status = 'error';
                error = e;
            }
        );

        return {
            read() {
                if (status === 'pending')
                    throw suspense;
                else if (status === 'error')
                    throw error;
                else if (status === 'success')
                    return result;
            }
        }
    }

    function fetchData(args) {
        const promise = fetchAPI(args);
        return wrapPromise(promise);
    }

    export default fetchData;
```

```tsx
    // child.tsx
    import { FC } from 'react'
    import { Resource_t } from './fetchData'

    interface Props {
        resource: Resource_t,
    }; 

    const Child: FC<Props> = ({resource}) => {
        const data = resource.read();

        return <div>{data}<div>
    }

    export default Child;
```

```tsx
    // parent.tsx
    import { Suspense } from 'react'
    import fetchData, { Resoucre_t } from './fetchData'

    import Child from './child'

    const Parent = () => {
        const [resource, setResource] = useState<Resource_t>();

        useEffect(() => {
            setResource(fetchData(args));
        },[setResource]);

        return (
            <div>
                <Suspense fallback={<div>Loading</div>} >
                    {resource && <Child resource={resource} />}
                </Suspense>

                <button onClick={() => setResource(fetchData(newArgs))}>
                    button
                </button
            </div>
        )
    }
```

- Check value exists in enum Typescript.

```ts
    enum MY_ENUM {
        VALUE_1 = 'value1',
        VALUE_2 = 'value2',
    };

    const value = 'something';
    // Check value in enum
    Object.values(MY_ENUM).includes(value as MY_ENUM);
```

- Use usePresence hook to manipulate rendering component from different AnimatePresence when change Route (path)

```jsx
    // App.tsx
    const [toRoute3, setToRoute3] = useState(false);

    <AnimatePresence exitBeforeEnter>
        {isRoute1 && <Route1 />}
        {isRoute2 && <Route2 setChangeToRoute3={ setToRoute3 } />}
    <AnimatePresence />

    {toRoute3 && <Route3 />}
```

```jsx
    // Route2.tsx
    const [isPresent, safeToRemove] = usePresence();

    // check current path is navigated to route-3
    const isRoute3 = useMatch('/route-3')

    useEffect(() => {
        if (!isRoute3) return;
        if (isPresent) return;

        safeToRemove && setTimeOut(() => {
            setToRoute3(true);
            safeToRemove();
        }, ...);
    },[isRoute3, isPresent, safeToRemove]);
```

- Preload font resource with html preload.

```html
    ...
    <link rel="preload" href="%PUBLIC_URL%/assets/fonts/DalekPinpointBold.ttf" as="font" type="font/ttf" crossorigin="anonymous"/>

    <!-- Font resource is already in cached so font-face doesn't download resource again -->
    <style>
        @font-face {
            font-family: "Dalek";
            src: url("%PUBLIC_URL%/assets/fonts/DalekPinpointBold.ttf") format('truetype');
            font-weight: bold;
        }
    </style>
    ...
```

- Preload image resource with React. Because React handle fetch resource on its way so above solution won't work.
```tsx
    // App.tsx
    useEffect(() => {
        new Image().src = 'image-resource-path';
    },[]);
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
- [Check value exists in enum Typescript](https://stackoverflow.com/questions/43804805/check-if-value-exists-in-enum-in-typescript)
- [Merge enums](https://stackoverflow.com/questions/48478361/how-to-merge-two-enums-in-typescript)
- [Wait for fonts to load before rendering web page](https://stackoverflow.com/questions/4712242/wait-for-fonts-to-load-before-rendering-web-page)
- [Preload font-face css](https://stackoverflow.com/questions/1330825/preloading-font-face-fonts)

## Author

- GitHub - [@trinhlehainam](https://github.com/trinhlehainam)
- Twitter - [@namtrile](https://www.twitter.com/namtrile)

## Acknowledgments
