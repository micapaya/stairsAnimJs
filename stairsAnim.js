
const stairsAnim = (arrayAnimationsProps, nodeTarget, isReverse) => {
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
