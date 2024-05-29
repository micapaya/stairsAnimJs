

# stairsAnimJs Documentation

**stairsAnimJs** is a library for creating multiple animations. Each animation will start only after the previous one has ended.

## Animation Object Structure

Each step of the animation requires an object with **three keys**:

1. **CSS Properties (`cssProps`):**
   - This key should be an object containing CSS properties.
   - Use valid JavaScript CSS property names (e.g., `marginTop: "10px"`).
   - You can include as many CSS properties as needed.

2. **Easing Value:**
   - This key is a string specifying the easing function (e.g., `ease`, `ease-in-out`, `linear`).
   - The key name can be anything, as long as it's the second key in the object.

3. **Duration (`timeSec`):**
   - This key is a string specifying the duration of the animation in seconds (e.g., `"0.6s"`).

You can create as many animation steps as you want. Once created, you must group them into an array.

## Playing the Animation

To play the animation, use the function:

*stairsAnimJs(animationSteps, targetNode, isReverse)**

* animationSteps (Array): An array of animation step objects.

* targetNode (DOM Node): The DOM node to which the animations will be applied.

*isReverse (Boolean): If false, the animations will play in the order they appear in the array. If true, they will play in reverse order.


```javascript

Example Usage : 

const animationOne = {
    cssProps: {
        transform: "translateY(-0rem) translateX(0rem) rotate(0deg) skewX(0deg)",
        width: "6vw",
        height: "10vh",
    },
    easingVal: "ease",
    timeSec: "0.6s"
};

const animationTwo = {
    cssProps: {
        transform: "translateY(-0rem) translateX(-0rem) rotate(0deg) skewX(0deg)",
        width: "100vw",
        height: "10vh",
    },
    easingVal: "ease",
    timeSec: "0.6s"
};

const animationThree = {
    cssProps: {
        transform: "translateY(-0rem) translateX(-0rem) rotate(-0deg) skewX(0deg)",
        width: "100vw",
        height: "10vh",
    },
    easingVal: "ease-out",
    timeSec: "0.9s"
};

const animationFour = {
    cssProps: {
        transform: "translateY(-0rem) translateX(0rem) rotate(0deg) skewX(0deg)",
        width: "100vw",
        height: "100vh",
    },
    easingVal: "ease-in",
    timeSec: "0.99s"
};

let animationsProps = [animationOne, animationTwo, animationThree, animationFour];

const theTarget = document.querySelector('.animatorSequence');
let isClicked = false;

theTarget.addEventListener('click', async (e) => {
    if (!isClicked) {
        await stairsAnimJs(animationsProps, theTarget, false);
        isClicked = true;
    } else {
        await stairsAnimJs(animationsProps, theTarget, true);
        isClicked = false;
    }
});

```

## Additional Notes

Ensure that the duration for each animation step is specified in seconds (s).
The stairsAnimJs function will play the animations in the specified order unless the isReverse flag is set to true.




In this documentation:

- Titles and headers are styled in white on a blue background.
- Lists are styled with square bullet points.
- Code blocks are highlighted with a grey background for better readability.
