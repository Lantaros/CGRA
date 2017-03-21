
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.5, //A ->0
            0.5, -0.5, 0.5,  //B ->1
            0.5, 0.5, 0.5,   //C ->2
            -0.5, 0.5, 0.5,  //D ->3

            -0.5, -0.5, -0.5, //E ->4
            0.5, -0.5, -0.5,  //F ->5
            0.5, 0.5, -0.5,   //G ->6
            -0.5, 0.5, -0.5,  //H ->7
			];

	this.indices = [
		  //xy z=0.5
          0,1,2,  //ABC
          2,3,0,  //CDA
		 //xy z = -0.5
		  5,4,7,  //FEH
		  7,6,5,  //HGF

		  //xz y = 0.5
		  3,2,6,  //DCG
		  6,7,3,  //GHD
		  //xz z = -0.5
		  0,4,5,  //AEF
		  5,1,0,  //FBA

		  //yz x = 0.5
		  5,6,2,	//FGC
          2,1,5,    //CBF
          //yz x = -0.5
          3,7,4,    //DHE
		  4,0,3	//EAD
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
