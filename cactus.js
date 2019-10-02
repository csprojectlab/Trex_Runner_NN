class Cactus {
    constructor (speed, img, x, y) {
        this.speed = speed;
        this.image = img;
        this.x = x;
        this.y = y;
        this.offscreen = false;
    }   // End of constructor

    /**
     * Show function
     */
    show () {
        image(this.image, this.x, this.y)        
    }   // End of show function

    /**
     * update function
     */
    update () {
        this.x -= this.speed * 5;
    }   // End of update function

    /**
     * Check bounds. Offscreen
     */
    checkBounds () {
        if (this.x < -this.image.width) {
            this.offscreen = true;
        }
    }   // End of offscreen function

    /**
     * Check whether on screen or not
     */
    isOffscreen () {
        return this.offscreen;
    }

    updateSpeed (speed) {
        this.speed = speed;
    }
}   // End of class