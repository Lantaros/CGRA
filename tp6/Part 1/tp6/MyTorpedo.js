/**
 * MyTorpedo
 * @constructor
 */
 function MyTorpedo(scene,x,y,z, angleUpDown, angleLeftRight) {
 	CGFobject.call(this,scene);
 	this.tar = new MyUnitCubeQuad(scene);
 	this.x = x +1;
 	this.y = y -2;
 	this.z = z -4;
    this.angleUpDown = angleUpDown;
    this.angleLeftRight = angleLeftRight;
    this.targ;

    //shape    
     this.bodyCylinder = new MyCylinderClosed(scene, 40, 4);
     this.frontSphr = new MyLamp(scene, 40, 4);
     this.backSphr = this.frontSphr;

     this.backFinHor = new MyTrapezoid(scene);
     this.backFinVert = new MyTrapezoid(scene);
 };

 MyTorpedo.prototype.display = function() {
 
  //Body
  this.scene.pushMatrix();
    this.scene.scale(0.2 ,0.2, 1);
    this.bodyCylinder.display();
  this.scene.popMatrix();

  //Front
   this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
     this.scene.scale(0.2 ,0.2, 0.2);
    this.frontSphr.display();
  this.scene.popMatrix();

   //Back
   this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
     this.scene.scale(0.2 ,0.2, 0.2);
    this.frontSphr.display();
  this.scene.popMatrix();

   //BackFinHor
   this.scene.pushMatrix();
   //this.scene.rotate(this.horFinAng, 1,0,0);
    this.scene.translate(-0.9,0.14,0);
    this.scene.scale(1.1, 0.2, 0.4);
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.translate(0.7,0,0.7);
    this.backFinHor.display();
  this.scene.popMatrix();


   //BackFinVert
  this.scene.pushMatrix();
 //   this.scene.rotate(this.vertFinAng, 0,1,0);
    this.scene.translate(0,-0.16,0);
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.scene.scale(1.2, 0.4, 0.2);
    this.backFinVert.display();
  this.scene.popMatrix();

};