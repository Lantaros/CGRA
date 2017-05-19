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
    this.targetList = new Array();    
    this.targetList.push(this.target1);
    this.targetList.push(this.target2);

    //Torpedo
    this.torpedo = null;
    this.nextPoint = {x:0,y:0,z:0};

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

    this.scene.pushMatrix();
        this.target1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1,1,1);
        this.target2.display();
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
MySubmarine.prototype.updateTorpedoPos = function(time,p1,p2,p3,p4) {
     // this.t = 0; //até this.t = 1, durante delta segundos
      //for ( this.t = 0; this.t < 1; this.t+(1/time)) { 
       this.t = 0;

    //time = Math.round(time);

    this.nextPoint.x = Math.pow(1-this.t,3) * p1.x + 3*this.t*Math.pow(1-this.t,2) * p2.x + 3*Math.pow(this.t,2)*(1-this.t)* p3.x + Math.pow(this.t,3)* p4.x;
    this.nextPoint.y = Math.pow(1-this.t,3) * p1.y + 3*this.t*Math.pow(1-this.t,2) * p2.y + 3*Math.pow(this.t,2)*(1-this.t)* p3.y + Math.pow(this.t,3)* p4.y;
    this.nextPoint.z = Math.pow(1-this.t,3) * p1.z + 3*this.t*Math.pow(1-this.t,2) * p2.z + 3*Math.pow(this.t,2)*(1-this.t)* p3.z + Math.pow(this.t,3)* p4.z;

    console.log("next X: " + this.nextPoint.x);  
    console.log("next Y: " + this.nextPoint.y);
    console.log("next Z: " + this.nextPoint.z);    
     this.scene.pushMatrix();
    this.scene.translate( this.nextPoint.x, this.nextPoint.y, this.nextPoint.z);
    //this.scene.rotate(Math.PI, 1,0,0);
    this.torpedo.display();
    this.scene.popMatrix()
    // }
    console.log("t: " + this.t + 1/time); 
    console.log("t: " + this.t + 2/time);
    console.log("t: " + this.t + 3/time);
    console.log("t: " + this.t + 4/time);
    console.log("t: " + this.t + 5/time);

    console.log("t: " + this.t + 6/time);

    

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
        //Q(t) == (1-t)^3 *P1 + 3t*(1-t)^2 *P2 + 3*t^2(1-t)*P3 + t^3 * P4
        
        //P1 ,P2, P3 and P4 for the curve
        this.p1 = {x: this.torpedo.x, y: this.torpedo.y, z: this.torpedo.z};
      
        this.p2 = {x:this.torpedo.x + Math.cos(this.angleFrwBck)*6, y:this.torpedo.y, z:this.torpedo.z + Math.sin(this.angleFrwBck)*6};
      
        this.p3 = {x:this.targetList[this.currTarget].x, y:this.targetList[this.currTarget].y + 3,z: this.targetList[this.currTarget].z};
      
        this.p4 = {x:this.targetList[this.currTarget].x, y:this.targetList[this.currTarget].y,z:this.targetList[this.currTarget].z};

        this.time = Math.sqrt( Math.pow(this.p1.x +this.p4.x,2) + Math.pow(this.p1.y+this.p4.y,2) + Math.pow(this.p1.z+this.p4.z,2)); 

        console.log("x: " + this.p1.x);
        console.log("y: " + this.p1.y);
        console.log("z: " + this.p1.z);
        console.log("x: " + this.p4.x);
        console.log("y: " + this.p4.y);
        console.log("z: " + this.p4.z);
        console.log("d: " + this.time);

        this.updateTorpedoPos(this.time, this.p1, this.p2, this.p3, this.p4);
      
        this.currTarget++;
    }
    else
        console.log("Hawe");
};
