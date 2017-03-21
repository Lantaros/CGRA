
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);

	this.quad=new MyQuad(this.scene);
    this.quad.initBuffers();

};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;		

MyUnitCubeQuad.prototype.display = function () {

	//Face Z =0.5
	this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
	
	//Preserve original square
    this.scene.popMatrix();
    this.scene.pushMatrix();

    //Face Z = -0.5
    this.scene.translate(0, 0 , -0.5);
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.quad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
	
	//Face X = 0.5
	this.scene.translate(0.5, 0, 0); 
	this.scene.rotate(Math.PI/2, 0, 1, 0);
	this.quad.display();

	this.scene.popMatrix();
	this.scene.pushMatrix();
    
    //Face X = -0.5
	this.scene.translate(-0.5, 0, 0);
	this.scene.rotate(1.5*Math.PI, 0, 1, 0); //3*PI/2
	this.quad.display();

	this.scene.popMatrix();
	this.scene.pushMatrix();

	//Face Y = 0.5
	this.scene.translate(0, 0.5, 0);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);
	this.quad.display();

	this.scene.popMatrix();
	
	//Face Y = -0.5
	this.scene.translate(0, -0.5, 0);
	this.scene.rotate(Math.PI/2, 1, 0, 0);
	this.quad.display();
	
	
};

