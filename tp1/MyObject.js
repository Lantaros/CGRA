/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyObject(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyObject.prototype = Object.create(CGFobject.prototype);
MyObject.prototype.constructor=MyObject;

MyObject.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
            1, 0.5, 0,//vertice inf direito
            0, 1.5, 0,//vert. sup
            -1, 0.5, 0 //vert. inf esquerdo           
			];

	this.indices = [//ordem em que devem ser desenhados
            0, 1, 2, 
			3, 2, 1,
            4, 5, 6
            //6, 5, 4//plano invertido
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
