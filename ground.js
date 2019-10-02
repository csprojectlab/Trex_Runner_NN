class Ground {
    constructor (speed, img, x, y) {
        this.speed = speed;
        this.groundImage = img;
        this.x = x;
        this.y = y;
    }   // End of constructor.

    /**
     * Show function
     */
    show () {
        image (this.groundImage, this.x, this.y);
        image (this.groundImage, this.x + this.groundImage.width, this.y)
    }   // End of show function

    /**
     * Ground animation function
     */
    animate () {
        this.x -= this.speed * 5;
        if (this.x < -this.groundImage.width) 
            this.x = 0;
    }   // End of animate function

    updateSpeed (speed) {
        this.speed = speed;
    }
}   // End of class.