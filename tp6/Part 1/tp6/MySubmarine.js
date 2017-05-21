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
    this.x =  8.1;
    this.y =  4;
    this.z = 7;

    //Speeds
    this.speed = 0;
    this.MAX_SPEED = 3;

 	//Targets
    this.target1 = new MyTargetCage(this.scene,2,0,2);
    this.fish = null;
    this.fish2 = null;
    this.target2 = new MyTargetCage(this.scene,-1,-5,-5);
    this.targetList = new Array();    
    this.targetList.push(this.target1);
    this.targetList.push(this.target2);
    this.fishes = new Array();
    this.fishes.push(this.fish);
    this.fishes.push(this.fish2);

    //Torpedo
    this.torpedo = null;
    this.nextPoint = {x:0,y:0,z:0};
    this.currTarget = 0;    
    this.torpAng = {x:0,y:0,z:0};
    this.time = 0;
    this.p1 = {x:0,y:0,z:0};
    this.p2 = {x:0,y:0,z:0};
    this.p3 = {x:0,y:0,z:0};  
    this.p4 = {x:0,y:0,z:0};
    this.elapsedTime;
    this.t = 0;
    
};

MySubmarine.prototype.display = function() {
    //display submarine
    this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angleLeftRight + Math.PI / 2, 0, 1, 0);
        this.scene.rotate(this.angleUpDown, -1,0,0);
        this.subShape.display();
    this.scene.popMatrix();    

     //torpedo movement
     if (this.torpedo != null){
         this.scene.pushMatrix();
            this.scene.translate(this.nextPoint.x,this.nextPoint.y,this.nextPoint.z);
            this.scene.rotate(this.torpedoAng, this.torpAng.x, this.torpAng.y, this.torpAng.z);
            this.torpedo.display();
      this.scene.popMatrix();
    }

    //display cages and fishes
    for (var i = 0; i < this.targetList.length; i++){
         if (this.targetList[i] != null){
            this.scene.pushMatrix();
                 this.scene.cageAppearance.apply();
                 this.targetList[i].display();
             this.scene.popMatrix();
          }
          else{
             this.scene.pushMatrix();
                this.scene.fishAppearance.apply();
                this.scene.translate(this.fishes[i].x,this.fishes[i].y,this.fishes[i].z);
                this.fishes[i].display();
             this.scene.popMatrix();
          }     
    }
};

MySubmarine.prototype.update = function(delta) {
    this.updatePos(delta);
    this.subShape.update(this.speed, delta);
    this.angleUpDown += (delta/1000) * this.angleUpDownDelta * Math.abs(this.speed);
   
    if (this.torpedo != null) {        
         this.elapsedTime +=delta/1000;
         if (this.elapsedTime < this.time){
           this.t += delta/1000 * (1/this.time);
           this.updateTorpedoPos(this.t,this.p1,this.p2,this.p3,this.p4);
         }
         else {
             this.elapsedTime = 0;
             this.t = 0;
             this.torpedo = null;
             this.fishes[this.currTarget] = new MyFishGroup(this.scene, this.targetList[this.currTarget].x, this.targetList[this.currTarget].y, this.targetList[this.currTarget].z);
             this.targetList[this.currTarget] = null;
             this.currTarget++;
         }
    }
    //update fishes movement
    for (var i = 0; i < this.fishes.length;i++)
        if (this.fishes[i] != null)
             this.fishes[i].update(delta);            
    
};

MySubmarine.prototype.updatePos = function(delta) {
    this.x += (delta/1000) * (this.speed * Math.cos(this.angleUpDown) * Math.cos(this.angleLeftRight));
    this.y += (delta/1000) * (this.speed * Math.sin(this.angleUpDown));
    this.z -= (delta/1000) * (this.speed * Math.cos(this.angleUpDown) * Math.sin(this.angleLeftRight));
};

MySubmarine.prototype.updateTorpedoPos = function(t,p1,p2,p3,p4) {
    
    this.nextPoint.x = Math.pow(1-t,3) * p1.x + 3*t*Math.pow(1-t,2) * p2.x + 3*Math.pow(t,2)*(1-t)* p3.x + Math.pow(t,3)* p4.x;
   
    this.nextPoint.y = Math.pow(1-t,3) * p1.y + 3*t*Math.pow(1-t,2) * p2.y + 3*Math.pow(t,2)*(1-t)* p3.y + Math.pow(t,3)* p4.y;
   
    this.nextPoint.z = Math.pow(1-t,3) * p1.z + 3*t*Math.pow(1-t,2) * p2.z + 3*Math.pow(t,2)*(1-t)* p3.z + Math.pow(t,3)* p4.z;
 
    //Q'(t) = (3 P4 - 9 P3 + 9 P2 - 3 P1) t^2  + (6 P3 - 12 P2 + 6 P1) t + 3 P2 - 3 P1

    this.torpAng.x = Math.atan( (3*p4.x - 9*p3.x + 9*p2.x - 3*p1.x)*Math.pow(t,2) + (6*p3.x - 12*p2.x + 6*p1.x)*t + 3*p2.x - 3*p1.x);
    this.torpAng.y = Math.atan( (3*p4.y - 9*p3.y + 9*p2.y - 3*p1.y)*Math.pow(t,2) + (6*p3.y - 12*p2.y + 6*p1.y)*t + 3*p2.y - 3*p1.y);
    this.torpAng.z = Math.atan( (3*p4.z - 9*p3.z + 9*p2.z - 3*p1.z)*Math.pow(t,2) + (6*p3.z - 12*p2.z + 6*p1.z)*t + 3*p2.z - 3*p1.z);

    this.torpedoAng = Math.atan2((3*p4.y - 9*p3.y + 9*p2.y - 3*p1.y)*Math.pow(t,2) + (6*p3.y - 12*p2.y + 6*p1.y)*t + 3*p2.y - 3*p1.y, (3*p4.z - 9*p3.z + 9*p2.z - 3*p1.z)*Math.pow(t,2) + (6*p3.z - 12*p2.z + 6*p1.z)*t + 3*p2.z - 3*p1.z );

 };

 MySubmarine.prototype.fireTorpedo = function() {
    if (this.currTarget <= this.targetList.length-1 && this.torpedo == null){

        //Q(t) = (1-t)^3 *P1 + 3t*(1-t)^2 *P2 + 3*t^2(1-t)*P3 + t^3 * P4
        
        this.elapsedTime = 0;

        this.torpedo = new MyTorpedo(this.scene,  this.x , this.y-2,  this.z,  this.angleUpDown,  this.angleFrwBck);
      

        //P1 ,P2, P3 and P4 for the curve
        this.p1 = {x: this.torpedo.x, y: this.torpedo.y, z: this.torpedo.z};
      
        this.p2 = {x:this.torpedo.x + Math.cos(this.angleLeftRight)*6, y:this.torpedo.y, z:this.torpedo.z + Math.sin(this.angleLeftRight)*6};
        
        this.p3 = {x:this.targetList[this.currTarget].x, y:this.targetList[this.currTarget].y + 3,z: this.targetList[this.currTarget].z};
      
        this.p4 = {x:this.targetList[this.currTarget].x, y:this.targetList[this.currTarget].y,z:this.targetList[this.currTarget].z};

        
        this.time = Math.sqrt( Math.pow(this.p1.x - this.p4.x,2) + Math.pow(this.p1.y-this.p4.y,2) + Math.pow(this.p1.z-this.p4.z,2)); 

     }
    else
        console.log("There are no more Torpedos left!");
};

MySubmarine.prototype.goLeft = function() {
    let newAng = this.angleLeftRight + 2 * degToRad *Math.abs(this.speed);
    if (newAng > 2 * Math.PI)
        this.angleLeftRight = newAng - 2*Math.PI;
    else
        this.angleLeftRight = newAng;
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


