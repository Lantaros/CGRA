/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0, //A ->0
            0.5, -0.5,0,  //B ->1
            0.5, 0.5, 0,   //C ->2
            -0.5, 0.5, 0,  //D ->3
			];

	this.indices = [
		  //xy z=0.5
          0,1,2,  //ABC
          2,3,0,  //CDA
        ];

    this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
    ]
		
	this.primitiveType=this.scene.gl.TRIANGLES;


	this.initGLBuffers();
};
