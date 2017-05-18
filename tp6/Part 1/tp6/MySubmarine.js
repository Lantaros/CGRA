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
    this.angleLeftRight = Math.PI / 2;
    this.angleUpDown = 0;
    this.angleUpDownDelta = 0;

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
        this.scene.rotate(this.angleLeftRight + Math.PI / 2, 0, 1, 0);
        this.scene.rotate(this.angleUpDown, -1,0,0);
        this.subShape.display();
    this.scene.popMatrix();    
};

MySubmarine.prototype.update = function(delta) {
    this.updatePos(delta);
    this.subShape.update(this.speed, delta);
    this.angleUpDown += (delta/1000) * this.angleUpDownDelta * Math.abs(this.speed);
};

MySubmarine.prototype.updatePos = function(delta) {
    this.x += (delta/1000) * (this.speed * Math.cos(this.angleUpDown) * Math.cos(this.angleLeftRight));
    this.y += (delta/1000) * (this.speed * Math.sin(this.angleUpDown));
    this.z -= (delta/1000) * (this.speed * Math.cos(this.angleUpDown) * Math.sin(this.angleLeftRight));
};

MySubmarine.prototype.goLeft = function() {
    let newAng = this.angleLeftRight + 2 * degToRad *Math.abs(this.speed);
    if (newAng > 2 * Math.PI)
        this.angleLeftRight = newAng - 2*Math.PI;
    else
        this.angleLeftRight = newAng;

    console.log(this.angleLeftRight);
};

MySubmarine.prototype.goRight = function() {
    let newAng = this.angleLeftRight - 2 * degToRad *Math.abs(this.speed);
    if (newAng < 0)
        this.angleLeftRight = 2 * Math.PI + newAng;
    else
        this.angleLeftRight = newAng;
};

MySubmarine.prototype.accelerate = function() {
    if (this.speed < this.MAX_SPEED)
        this.speed = Math.round((this.speed+0.4) * 10)/10;
};

MySubmarine.prototype.decelerate = function() {
    if (this.speed > -this.MAX_SPEED)
       this.speed = Math.round( (this.speed - 0.4) * 10)/10;
};

MySubmarine.prototype.up = function() {
    let newAng = this.angleUpDown + 10 * degToRad;
    if (newAng <= Math.PI/6)
        this.angleUpDownDelta = 10 * degToRad;
};

MySubmarine.prototype.down = function() {
   let newAng = this.angleUpDown - 10 * degToRad;
   if (newAng >= -Math.PI/6)
        this.angleUpDownDelta = -10 *degToRad;
};

MySubmarine.prototype.periUp = function() {
     this.subShape.periscopeUp();
};

MySubmarine.prototype.periDown = function() {
     this.subShape.periscopeDown();
};
