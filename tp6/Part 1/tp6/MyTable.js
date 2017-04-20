
function MyTable(scene) {
	CGFobject.call(this,scene);

    this.cubeQuad=new MyUnitCubeQuad(this.scene);
	this.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	
	this.scene.translate(-4,0,0); //por as mesas dentro da area
	//pernas da mesa
	this.scene.pushMatrix();
	this.scene.translate(3/2,0.1,3/2); //coloca o objeto no sítio
	this.scene.scale(0.3,3.5,0.3); //estica o quadrado
	this.scene.translate(0.5,0.5,0.5); //coloca o quadrado na parte positiva
	this.cubeQuad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(8-0.3-3/2,0.1,3/2); //coloca o objeto no sítio
	this.scene.scale(0.3,3.5,0.3); //estica o quadrado
	this.scene.translate(0.5,0.5,0.5); //coloca o quadrado na parte positiva
	this.cubeQuad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(3/2,0.1,6-0.3-3/2); //coloca o objeto no sítio
	this.scene.scale(0.3,3.5,0.3); //estica o quadrado
	this.scene.translate(0.5,0.5,0.5); //coloca o quadrado na parte positiva
	this.cubeQuad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(8-0.3-3/2,0.1,6-0.3-3/2); //coloca o objeto no sítio
	this.scene.scale(0.3,3.5,0.3); //estica o quadrado
	this.scene.translate(0.5,0.5,0.5); //coloca o quadrado na parte positiva
	this.cubeQuad.display();
	this.scene.popMatrix();
		

    //tampo
    this.scene.pushMatrix();    
    this.scene.tableAppearance.apply(); //aplica a textura no tampo
	this.scene.translate(3/2,3.6,3/2); //coloca o objeto no sítio
	this.scene.scale(5,0.3,3); //estica o quadrado
	this.scene.translate(0.5,0.5,0.5); //coloca o quadrado na parte positiva
	this.cubeQuad.display();
	this.scene.popMatrix();

	this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};