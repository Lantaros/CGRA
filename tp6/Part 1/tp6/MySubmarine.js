/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene); 	

	this.sub = new MyTriangleSub(scene);
 };
MySubmarine.prototype.display = function () {

 this.scene.pushMatrix();
 this.sub.display();
 this.scene.popMatrix();
        
 this.primitiveType=this.scene.gl.TRIANGLES;
};