function naturalSelection (objects) {
    let matingPool = [];
    let maxFitness = 0;
    for (let object of objects) 
        maxFitness = Math.max(maxFitness, object.fitness);
    // Adding to mating pool
    for (let i = 0; i < objects.length; i++) {
        let fitness = map (objects[i].fitness, 0, maxFitness, 0, 1);
        let n = floor (fitness * 100);
        for (let j = 0; j < n; j++)
            matingPool.push(objects[i]);
    }
    return matingPool;
}


function generateUsingTournamentSelection (oldDinos) {
    let matingPool = naturalSelection (oldDinos);
    let newGeneration = [];
    for (let i = 0; i < oldDinos.length; i++) {
        let a = floor(random(matingPool.length));
        let b = floor(random(matingPool.length))
        let partnerA = matingPool[a];
        let partnerB = matingPool[b];
        let child = partnerA.crossover(partnerB);   // crossover and mutated
        newGeneration[i] = child;
    }
    return newGeneration;
}


function nextGenerationUsingTournamentSelection () {
    resetGame ();
    normalizeFitness(allDinos);
    dinos = generateUsingTournamentSelection(allDinos);
    allDinos = dinos.slice();
}