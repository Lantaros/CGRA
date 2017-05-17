/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene,x,y,z) {
 	CGFobject.call(this,scene);
 	this.scene = scene;
 	this.tar = new MyUnitCubeQuad(scene);
 	this.x = x;
 	this.y = y;
 	this.z = z;	
 };
 

 MyTarget.prototype.display = function() {
   this.scene.pushMatrix();
    this.tar.display();
   this.scene.popMatrix();
};