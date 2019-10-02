/**
 * Cloud class to move the cloud image from right to left.
 */
class Cloud {
    constructor (speed, img, x, y, w) {
        this.speed = speed;
        this.image = img;
        this.x = x;
        this.y = y;
        this.w = 40;
        if (w)
            this.w = w;
        this.offscreen = false;
    }   // End of constructor

    /**
     * Show function
     */
    show () {
        image(this.image, this.x, this.y, this.w, this.w)
    }   // End of show function

    /**
     * update function
     */
    update () {
        this.x -= this.speed * 5;
        if (this.x < -this.image.width)
            this.x = width;
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