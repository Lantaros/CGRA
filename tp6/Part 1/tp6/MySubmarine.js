/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene); 	

	this.sub = new MyTriangleSub(scene);
	this.angle = 0;

 };
MySubmarine.prototype.display = function () {

 this.scene.pushMatrix();
 this.scene.rotate(this.angle, 0,1,0);
 this.sub.display();
 this.scene.popMatrix();
        
 this.primitiveType=this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.goLeft = function () {
	this.angle += 10*degToRad;
        
 this.primitiveType=this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.goRight = function () {
	this.angle -= 10*degToRad;
        
 this.primitiveType=this.scene.gl.TRIANGLES;
};
