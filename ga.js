function resetGame () {
   velocity = 1.7;
    cactus = [];
    vultures = [];
}   // End of resetGame function

function normalizeFitness (objects) {
    for (let i = 0; i < objects.length; i++)
        objects[i].score = pow (objects[i].score, 2);
    // add all the scores.
    let sum = 0;
    for (let i = 0; i < objects.length; i++)
        sum += objects[i].score;
    // Normalize
    for (let i = 0; i < objects.length; i++)
        objects[i].fitness = objects[i].score / sum;    
}   // End of normalizeFitness function

function poolSelection (objects) {
    
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r -= objects[index].fitness;
        index += 1;
    }
    index -= 1;
    
    return objects[index].copy();
}   // End of poolSelection function

function generate (oldObjects) {
    let newObjects = [];
    for (let i = 0; i < oldObjects.length; i++) {
        let d = poolSelection(oldObjects);
        newObjects[i] = d;
    }    
    return newObjects;
}   // End of generate function


function nextGeneration () {
    
    resetGame ();
    normalizeFitness(allDinos);
    dinos = generate(allDinos);    
    allDinos = dinos.slice();       // Create a copy.
}   // End of nextGeneration function