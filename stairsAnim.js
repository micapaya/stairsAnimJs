// This lib is a program for make multiple animation
// first animation was end before start secund ... etc
// step animation is one objet require 3 key :
// first key is CSS property, the can be various but type is an object
/// in this object you must use current JS property CSS (exemple: marginTop: "10px")
/// no limit for number Css Properties
// secund key is a simple key, the name hasn't impact for the program just the position, this property require
// string with easing value only (exemple: ease, ease-in-out, etc...)
// the last key is the duration for frame in secund unit "s" only

// you can create autant de frame que vous voulez, l'important c'est qu'une fois crées vous devez les regrouper
// dans un Array;


////////////// play this animation :
//  animatorSequencer([type: ArrayOfObjet], [DomNode], [bool]);
// if bool is False, this step of animation play in each of ArrayOfObject 
// else true, step animation play reverse 

////////////////////////////// using exemple : 


// const animationOne = {
//     cssProps: {
//         transform: "translateY(-0rem) translateX(0rem) rotate(0deg) skewX(0deg)",
//         width: "6vw",
//         height: "10vh",
//     },
//     easingVal: "ease",
//     timeSec: "0.6s" 
// }
// const animationTwo = {
//     cssProps: {
//         transform: "translateY(-0rem) translateX(-0rem) rotate(0deg) skewX(0deg)",
//         width: "100vw",
//         height: "10vh",
//     }, 
//     easingVal: "ease",
//     timeSec: "0.6s" 
// }
// const animationThree = {
//     cssProps: {
//         transform: "translateY(-0rem) translateX(-0rem) rotate(-0deg) skewX(0deg)",
//         width: "100vw",
//         height: "10vh",
//     },
//     easingVal: "ease-out",
//     timeSec: "0.9s" 
// }
// const animationFour = {
//     cssProps: {
//         transform: "translateY(-0rem) translateX(0rem) rotate(0deg) skewX(0deg)",
//         width: "100vw",
//         height: "100vh",
//     },
//     easingVal: "ease-in",
//     timeSec: "0.99s" 
// }

// let animationsProps = [animationOne,animationTwo,animationThree,animationFour];
// const theTarget = document.querySelector('.animatorSequence');
// let isClicked = false;
// theTarget.addEventListener('click', async (e) => {
//     if (!isClicked) {
//         await animatorSequencer(animationsProps, theTarget, false);
//         isClicked = true;
//     } else {
//         await animatorSequencer(animationsProps, theTarget, true);
//         isClicked = false;
//     }
// });


const animatorSequencer = (arrayAnimationsProps, nodeTarget, isReverse) => {
    return new Promise(resolve => {
        let totalTime = 0;
        if (isReverse === true) {
            arrayAnimationsProps = arrayAnimationsProps.slice().reverse(); // Inverser l'ordre du tableau
        }
        arrayAnimationsProps.forEach(currentAnimation => {
            setTimeout(() => {
                // Récupérer les clés pour CSS, easing, et temps dynamiquement
                const cssKey = Object.keys(currentAnimation).find(key => typeof currentAnimation[key] === 'object');
                const easeKey = Object.keys(currentAnimation)[1]; // Accéder à la deuxième clé
                const timeKey = Object.keys(currentAnimation).find(key => typeof currentAnimation[key] === 'string' && currentAnimation[key].endsWith('s'));

                // Injecter les propriétés CSS à l'élément cible
                Object.assign(nodeTarget.style, currentAnimation[cssKey]);

                // Appliquer easing et durée
                nodeTarget.style.transition = `all ${currentAnimation[timeKey]} ${currentAnimation[easeKey]}`;

                // Calculer la durée totale de l'animation
                const animationDuration = parseFloat(currentAnimation[timeKey]) * 1000;

                // Ajouter un événement de transition pour détecter la fin de l'animation
                nodeTarget.addEventListener('transitionend', () => {
                    // Attendre la fin de cette animation avant de commencer la suivante
                    resolve();
                }, { once: true }); // Détacher l'événement après sa première exécution
            }, totalTime);

            // Convertir le temps de la durée en millisecondes et l'ajouter au total
            const timeKey = Object.keys(currentAnimation).find(key => typeof currentAnimation[key] === 'string' && currentAnimation[key].endsWith('s'));
            totalTime += parseFloat(currentAnimation[timeKey]) * 1000;
        });
    });
};
