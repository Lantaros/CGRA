/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.sub = new MyTriangleSub(scene);
    this.angle = Math.PI/2;
    this.x = 0;
    this.z = 0;

};

MySubmarine.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.x, 0, this.z);
    this.scene.rotate(this.angle + Math.PI/2, 0, 1, 0);
    this.sub.display();
    this.scene.popMatrix();
 }
;
MySubmarine.prototype.goLeft = function() {
    let newAng = this.angle + 10 * degToRad;
    if (newAng > 2 * Math.PI)
        this.angle = newAng - 2 * Math.PI;
    else
        this.angle = newAng;
}
;

MySubmarine.prototype.goRight = function() {
    let newAng = this.angle - 10 * degToRad;
    if (newAng < 0)
        this.angle = 2 * Math.PI + newAng;   //newAng is <0 
    else
        this.angle = newAng;
}
;

MySubmarine.prototype.goForw = function() {
    	this.x += Math.cos(this.angle);
    	this.z -= Math.sin(this.angle);         
};

MySubmarine.prototype.goBack = function() {
    	this.x -= Math.cos(this.angle);
    	this.z += Math.sin(this.angle);         
};

