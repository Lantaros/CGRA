/**
 * MyPropeller
 * @constructor
 */


 function MyPropeller(scene) {
 	CGFobject.call(this,scene); 	

    this.rec = new MyUnitCubeQuad(scene);
	this.sphr = new MyLamp(scene, 40, 4);
	this.cyl = new MyCylinder(scene, 40, 4);
  
    this.diameter= 0.4;

 };


MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor=MyPropeller;


MyPropeller.prototype.display = function() {
    
    //Propeller Rec
    this.scene.pushMatrix();
        this.scene.translate(0,0,0.2)
        this.scene.scale(0.75, 0.12, 0.03);
        this.rec.display();
    this.scene.popMatrix();

    //Propeller Sphere
    this.scene.pushMatrix();
        this.scene.translate(0,-0.0001,0.2);
        this.scene.scale(0.06, 0.06, 0.06);
        this.sphr.display();
    this.scene.popMatrix();

    //Propeller Cylinder
    this.scene.pushMatrix();
        this.scene.translate(0,-0.0001,0.01);
        this.scene.scale(this.diameter,this.diameter,this.diameter);
        this.scene.pushMatrix();
            this.scene.scale(-1,1, 1);
            this.cyl.display();
        this.scene.popMatrix();
        this.cyl.display();
    this.scene.popMatrix();
};