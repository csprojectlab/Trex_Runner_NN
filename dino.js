class Dino {
    constructor (speed, animation, x, y, brain) {
        this.speed = speed;
        this.animation = animation;
        this.len = animation.length;
        this.x = x;
        this.y = y;
        this.index = 0;
        // Velocity vectors
        this.vy = 0;
        this.gravity = 0.7;
        this.r = 40;

        if (brain && brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(MUTATION_RATE);
            
        } else {
            this.brain = new NeuralNetwork(2, 16, 2);
        }
        this.score = 0;
        this.fitness = 0;
    }   // End of constructor

    /**
     * copy brain
     */
    copy () {
        return new Dino(this.speed, this.animation, this.x, this.y, this.brain);
    }

    /**
     * Jump function
     */
    jump () {      
        if (this.y == 302 - this.animation[0].height)  
            this.vy = -16;        
    }

    /**
     * move function
     */
    move () {
        this.y += this.vy;
        this.vy += this.gravity;
        // this.vy = constrain(this.vy, -100, 25);
        this.y = constrain(this.y, 0, 302 - this.animation[0].height)
    }

    /**
     * Show function
     */
    show () {
        let index = floor(this.index) % this.len;
        image (this.animation[index] , this.x, this.y)       
    }   // End of show function

    /**
     * animate function
     */
    animate () {
        this.index += (this.speed / 20);
        this.score++;        
    }

    /**
     * hit function
     */
    hitsCactus (objects) {
        for (let c of objects) {
            let x = collideRectRect(c.x, c.y, c.image.width, c.image.height, this.x, this.y, this.animation[0].width - 22, this.animation[0].height - 10)
            if (x)  return x;
        }
        return false;
    }   // End of hits function

    /**
     * hit function
     */
    hitsVulture (objects) {
        for (let c of objects) {
            let x = collideRectRect(c.x, c.y, c.animation[0].width, c.animation[0].height, this.x, this.y, this.animation[0].width - 22, this.animation[0].height - 10)
            if (x)  return x;
        }
        return false;
    }   // End of hits function

    /**
     * Think when objects comes close
     */
    think (objects) {
        // Find the closest cactus
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < objects.length; i++) {
            let diff = objects[i].x - this.x;
            if (diff > 0 && diff < record) {
                record = diff;
                closest = objects[i];
            }
        }   // End of for loop

        let inputs = [];
        if (closest != null) {            
            inputs[0] = map (closest.x - this.x, 0, width, 0, 1);
            // inputs[1] = map (, 0, height, 0, 1);
            // inputs[2] = map (closest.image.width, MIN_IMAGE_WIDTH, MAX_IMAGE_WIDTH, 0, 1); 
            inputs[1] = map (this.speed, MIN_VELOCITY, MAX_VELOCITY, 0, 1);
            
            let outputs = this.brain.predict (inputs);
            if (outputs[1] > outputs[0]) {                
                this.jump();
            } else {}
        }        
    }   // End of think function

    /**
     * Crossover function
     */
    crossover (partner) {
        return new Dino(this.speed, this.animation, this.x, this.y, this.brain.crossover(partner.brain));
    }

    updateSpeed (speed) {
        this.speed = speed;
    }
}   // End of class