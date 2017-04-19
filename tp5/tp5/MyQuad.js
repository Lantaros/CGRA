/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MyQuad(scene, minS = 0, maxS = 1, minT = 0, maxT = 1) {
	CGFobject.call(this,scene);

	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
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

	//coordenadas de textura, tendo em conta os vértices
   	
    this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.maxS, this.minT,
		this.minS, this.minT,
	];
	 
		
	this.primitiveType=this.scene.gl.TRIANGLES;


	this.initGLBuffers();
};
