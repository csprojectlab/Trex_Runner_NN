let spriteImagesDino = [];
let dinos = [];
let spriteImagesVulture = [];
let vultures = [];
let cloudImage = null;
let clouds = [];
let groundImage = null;
let ground = null;
let cactusImages = [];
let cactus = []
let counter = 0;

let w = 600;

let velocity = 1.7
const MIN_VELOCITY = 0.7;
const MAX_VELOCITY = 3;
const MIN_IMAGE_WIDTH = 30;
const MAX_IMAGE_WIDTH = 86;
const MUTATION_RATE = 0.1;
const TOTAL_POPULATION = 40;

let generationNumber = 1;
let allDinos = [];

let speedSlider = null;

let obstacleSpeed = 60;

function preload () {
    // reading the dino sprite image.
    for (let i = 1; i <= 6; i++) {
        let path = "./assets/dino1/" + i + ".png"
        spriteImagesDino.push(loadImage(path, () => console.log(i + "th image loaded")))
    }
    for (let i = 1; i <= 2; i++) {
        let path = "./assets/vulture/" + i + ".png";
        spriteImagesVulture.push(loadImage(path, () => console.log(i + "th vulture image loaded")))
    }
    for (let i = 1; i <= 3; i++) {
        let path = "./assets/cactus/" + i + ".png";
        cactusImages.push(loadImage(path, () => console.log(i + "th cactus image loaded")))
    }
    groundImage = loadImage("./assets/floor/1.png", () => console.log("Ground image loaded"))
    cloudImage = loadImage ("./assets/cloud/1.png", () => console.log("Cloud image loaded"))
}

function setup () {
    createCanvas(1400, 400);
    tf.setBackend('cpu')
    for (let i = 0; i < TOTAL_POPULATION; i++) {
        dinos[i] = new Dino(velocity, spriteImagesDino, floor(random(20, 200)), 302 - spriteImagesDino[0].height)
        allDinos[i] = dinos[i];     // Creating a copy.        
    }   

    for (let i = 0; i < 5; i++) {
        clouds[i] = new Cloud(velocity / 20 + random(0.001, 0.05), cloudImage, width, i * 25,  random(40, 80))
    }

    
        // vultures[i-3] = new Sprite(random(0.05, 0.4), spriteImagesVulture, width, i * 25, false)
    ground = new Ground (velocity, groundImage, 10, 300);  
    
    speedSlider = createSlider(1, 10, 1);
}

function draw () {    
    background(255);   
    
    let cycles = speedSlider.value();
    for (let i = 1; i <= cycles; i++) {
        for (let cloud of clouds) {
            cloud.show();
            cloud.update();
        }
    
        ground.show ();
        ground.animate ();
    
        if (counter % obstacleSpeed == 0) {
            let r = floor (random(1, 20));
            obstacleSpeed = floor(map (r, 1, 20, 60, 100))
            console.log(obstacleSpeed)
            if (random(1) < 0.17) {
                vultures.push(new Vulture(velocity, spriteImagesVulture, width, 240, 60));
            } else {
                let r = floor(random(1, 4))        
                cactus.push(new Cactus(velocity, cactusImages[r-1], width, 260));
            }            
        }
        
        counter++;
        if (counter > 2000) {
            counter = floor(random(13, 17))
            velocity += 0.05;
            if (obstacleSpeed > 60)
                obstacleSpeed -= 10;
            console.log("Updating velocities")
            for (let c of cactus)  c.updateSpeed(velocity);
            for (let v of vultures)  v.updateSpeed(velocity);
            for (let c of clouds)   c.updateSpeed(velocity / 20 + random(0.001, 0.05));   
            ground.updateSpeed(velocity)               
        }  
    
        for (let i = cactus.length - 1; i >= 0; i--) {
            cactus[i].checkBounds();
            if (cactus[i].isOffscreen()) {
                cactus.splice(i, 1);
            }
        }

        for (let i = vultures.length - 1; i >= 0; i--) {
            vultures[i].checkBounds();
            if (vultures[i].isOffscreen()) 
                vultures.splice(i, 1);
        }
       
        for (let c of cactus) {
            c.show();
            c.update();
        }

        for (let c of clouds) {
            c.show ();
            c.update();
        }

        for (let v of vultures) {
            v.show ();
            v.update ();
        }

        // 
        for (let i = dinos.length - 1; i >= 0; i--) {
            let d = dinos[i];        
            d.think(cactus.concat(vultures));            
            d.move();
            d.animate();
            let hit = false;
            for (let j = 0; j < cactus.length; j++) {
                if (d.hitsCactus(cactus)) {
                    dinos.splice(i, 1);
                    hit = true;
                    break;
                }
            }
            if (!hit) {
                for (let j = 0; j < vultures.length; j++){
                    if (d.hitsVulture(vultures)) {
                        dinos.splice(i, 1);
                        break;
                    }
                }
            }
        }
    
        for (let d of dinos) {
            d.show ();
        }
    
        if (dinos.length == 0) {            
            generationNumber++;
            console.log("Generation: " + generationNumber);
            // nextGeneration();
            nextGenerationUsingTournamentSelection();
            ground = new Ground (velocity, groundImage, 10, 300);  
        }
    
    }

}

function keyPressed() {
    if (key == ' ') {        
        for (let d of dinos) {
            d.jump();
        }
    }
}