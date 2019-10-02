class Vulture {
    constructor (speed, animation, x, y, w) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animation = animation;
        this.len = animation.length;
        this.index = 0;        
        this.w = 40;
        if (w)  this.w = w;
        this.offscreen = false;
    }

    show () {
        let index = floor(this.index) % this.len;
        image (this.animation[index] , this.x, this.y, this.w, this.w)
    }

    update () {    
        this.index += (this.speed / 30);              
        this.x -= this.speed * 5;         
    }

    /**
     * Check bounds. Offscreen
     */
    checkBounds () {
        if (this.x < -this.animation[0].width) {
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
}