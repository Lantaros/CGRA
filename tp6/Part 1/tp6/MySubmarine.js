/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.subShape = new MySubmarineShape(scene);
    this.trap = new MyTrapezoid(scene);
    this.cyl = new MyCylinderClosed(scene,40,2);

    //Coordinates
    this.angle = Math.PI / 2;
    this.x = 0;
    this.z = 0;
    this.speed = 0;
    this.MAX_SPEED = 3;

};
MySubmarine.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.x, 0, this.z);
    this.scene.rotate(this.angle + Math.PI / 2, 0, 1, 0);
    this.subShape.display();
    this.scene.popMatrix();
    this.scene.translate(5, 5, 3);

    //this.scene.rotate(Math.PI/2, 1,0,0);
    //this.scene.subAppearance.apply();
    //this.cyl.display();
    //this.trap.display();
};

MySubmarine.prototype.update = function(delta) {
    this.updatePos(delta);
    this.subShape.update(this.speed);
};

MySubmarine.prototype.updatePos = function(delta) {
    this.x += (60 / delta) * (this.speed * Math.cos(this.angle));
    this.z -= (60 / delta) * (this.speed * Math.sin(this.angle));
};

MySubmarine.prototype.goLeft = function() {
    let newAng = this.angle + 10 * degToRad;
    if (newAng > 2 * Math.PI)
        this.angle = newAng - 2 * Math.PI;
    else
        this.angle = newAng;
};

MySubmarine.prototype.goRight = function() {
    let newAng = this.angle - 10 * degToRad;
    if (newAng < 0)
        this.angle = 2 * Math.PI + newAng;
        //newAng is <0
    else
        this.angle = newAng;
};

MySubmarine.prototype.accelerate = function() {
    if (this.speed < this.MAX_SPEED)
        this.speed += 0.2;
}
;

MySubmarine.prototype.decelerate = function() {
    if (this.speed > -this.MAX_SPEED)
        this.speed -= 0.2;
}
;
