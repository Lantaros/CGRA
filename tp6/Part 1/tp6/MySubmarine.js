/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.subShape = new MySubmarineShape(scene);
    this.trap = new MyTrapezoid(scene);
    this.cyl = new MyCylinderClosed(scene,40,2);

    //Angles
    this.angleFrwBck = Math.PI / 2;
    this.angleUpDown = 0;

    //Coordinates
    this.x = 0;
    this.y = 0;
    this.z = 0;
    
    //Speeds
    this.speed = 0;
    this.MAX_SPEED = 3;

};
MySubmarine.prototype.display = function() {
    this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angleFrwBck + Math.PI / 2, 0, 1, 0);
        this.scene.rotate(this.angleUpDown, -1,0,0);
        this.subShape.display();
    this.scene.popMatrix();    
};

MySubmarine.prototype.update = function(delta) {
    this.updatePos(delta);
    this.subShape.update(this.speed, delta);
};

MySubmarine.prototype.updatePos = function(delta) {
    this.x += (60 / delta) * (this.speed * Math.cos(this.angleUpDown) * Math.cos(this.angleFrwBck));
    this.y += (60 / delta) * (this.speed * Math.sin(this.angleUpDown));
    this.z -= (60 / delta) * (this.speed * Math.cos(this.angleUpDown) * Math.sin(this.angleFrwBck));
};

MySubmarine.prototype.goLeft = function() {
    let newAng = this.angleFrwBck + 2 * degToRad;
    if (newAng > 2 * Math.PI)
        this.angleFrwBck = newAng - 2 * Math.PI;
    else
        this.angleFrwBck = newAng;
};

MySubmarine.prototype.goRight = function() {
    let newAng = this.angleFrwBck - 2 * degToRad;
    if (newAng < 0)
        this.angleFrwBck = 2 * Math.PI + newAng;
    else
        this.angleFrwBck = newAng;
};

MySubmarine.prototype.accelerate = function() {
    if (this.speed < this.MAX_SPEED)
        this.speed = Math.round( (0.2 + this.speed) * 10)/10;
};

MySubmarine.prototype.decelerate = function() {
    if (this.speed > -this.MAX_SPEED)
       this.speed = Math.round( (this.speed - 0.2) * 10)/10;
};

MySubmarine.prototype.up = function() {
    let newAng = this.angleUpDown + 10 * degToRad;
    if (newAng <= Math.PI/4)
        this.angleUpDown = newAng;
};

MySubmarine.prototype.down = function() {
   let newAng = this.angleUpDown - 10 * degToRad;
   if (newAng >= -Math.PI/4)
        this.angleUpDown = newAng;
};

MySubmarine.prototype.periUp = function() {
     this.subShape.periscopeUp();
};

MySubmarine.prototype.periDown = function() {
     this.subShape.periscopeDown();
};
