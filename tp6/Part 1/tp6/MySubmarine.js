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
    this.x =  8.1;
    this.y =  4;
    this.z = 7;

    //Speeds
    this.speed = 0;
    this.MAX_SPEED = 3;

 	//Targets
    this.target1 = new MyTarget(this.scene,-5,-5,-5);
    this.target2 = new MyTarget(this.scene,-1,-5,-5);

    this.torpedo = null;
    this.targetList = new Array();    
    this.targetList.push(this.target1);
    this.targetList.push(this.target2);

    this.currTarget = 0;
   
};

MySubmarine.prototype.display = function() {
    this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angleFrwBck + Math.PI / 2, 0, 1, 0);
        this.scene.rotate(this.angleUpDown, -1,0,0);
        this.subShape.display();
    this.scene.popMatrix();    

     if (this.torpedo != null){
            this.scene.pushMatrix();
            //this.scene.translate(this.x,this.y,this.z);
            this.scene.rotate(Math.PI, 1,0,0);
            this.torpedo.display();
      this.scene.popMatrix();
    }

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

MySubmarine.prototype.fireTorpedo = function() {
    if (this.currTarget <= this.targetList.length-1){
       this.torpedo = new MyTorpedo(this.scene,  this.x , this.y-2,  this.z,  this.angleUpDown,  this.angleFrwBck);
        this.currTarget++;
    }
    else
        console.log("Hawe");
};
