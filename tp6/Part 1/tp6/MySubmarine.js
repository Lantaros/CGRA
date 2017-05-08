/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.bodyCylinder = new MyCylinder(scene, 40, 4);
    this.frontSphr = new MyLamp(scene, 40, 4);
    this.backSphr = this.frontSphr;
    this.tower = this.bodyCylinder;
    this.periVert = this.bodyCylinder;
    this.periHor = this.bodyCylinder;
    this.towerFin = new MyTrapezoid(scene);
    this.backFinHor = new MyTrapezoid(scene);
    this.backFinVert = new MyTrapezoid(scene);
	this.leftPropeller = new MyPropeller(scene);
	this.rightPropeller = new MyPropeller(scene);
    //this.sub = new MyTriangleSub(scene);
    //Coordinates
    this.angle = Math.PI/2;
    this.x = 0;
    this.z = 0;

};

MySubmarine.prototype.display = function() {

//     this.scene.pushMatrix();
//     this.scene.translate(this.x, 0, this.z);
//     this.scene.rotate(this.angle + Math.PI/2, 0, 1, 0);
//     this.sub.display();
//     this.scene.popMatrix();

//     this.scene.pushMatrix();
//     this.bodyCylinder.display();
//     this.scene.popMatrix();
 
  this.scene.pushMatrix();
	//this.scene.translate(0, 0, 2.04);
    this.scene.scale(0.73 , 1, 4.08);
	//this.scene.translate(0, 0, -0.5);
    this.bodyCylinder.display();
  this.scene.popMatrix();

   //Front
   this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(0.73, 1, 1);
    this.frontSphr.display();
  this.scene.popMatrix();

   //Back
   this.scene.pushMatrix();
    this.scene.translate(0, 0, 4.08);
    this.scene.scale(0.73, 1, 1);
    this.frontSphr.display();
  this.scene.popMatrix();

  //BackFinHor
  this.scene.pushMatrix();
    this.scene.translate(0.7,0,0);
   // this.scene.scale(0.73, 1, 1);
    this.backFinHor.display();
  this.scene.popMatrix();

   //BackFinVert
  this.scene.pushMatrix();
    this.scene.translate(0.1,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
   // this.scene.scale(0.73, 1, 1);
    this.backFinVert.display();
  this.scene.popMatrix();
 
  //Tower
  this.scene.pushMatrix();
    this.scene.translate(0, 0.72, 0.88/2 + 1);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 0.57);
    this.tower.display();
  this.scene.popMatrix();
 
  //TowerFin
  this.scene.pushMatrix();
    this.scene.translate(0.6,1,1.2);
   // this.scene.scale(0.73, 1, 1);
    this.towerFin.display();
  this.scene.popMatrix();
  
  //Periscope Vertical
  this.scene.pushMatrix();
	this.scene.translate(0, 1.2, 1.2);
    this.scene.scale(0.1, 1, 0.1);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.periVert.display();
  this.scene.popMatrix();

  //Periscope Horizontal
  this.scene.pushMatrix();
	this.scene.translate(0,  1.2 + 0.9, 1.2 - 0.23);
    this.scene.scale(0.09, 0.09, 0.31);
    this.periVert.display();
  this.scene.popMatrix();


  //Left Propeller
  this.scene.pushMatrix();
  	this.scene.translate(-1.06,-0.5,0);
    this.leftPropeller.display();
  this.scene.popMatrix();

  //Right Propeller
  this.scene.pushMatrix();
  	this.scene.translate(1.06,-0.5,0);
    this.leftPropeller.display();
  this.scene.popMatrix();

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
