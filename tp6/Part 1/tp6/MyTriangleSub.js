 
/**
 * MyTriangleSub
 * @constructor
 */
 function MyTriangleSub(scene) {
 	CGFobject.call(this,scene);
    this.initBuffers();
 };

MyTriangleSub.prototype = Object.create(CGFobject.prototype);
MyTriangleSub.prototype.constructor=MyTriangleSub;

 MyTriangleSub.prototype.initBuffers = function() {
   
    this.vertices = new Array();
    this.indices = new Array();
    this.normals = new Array();

    this.vertices.push(0.5, 0.3, 0);
    this.vertices.push(-0.5, 0.3, 0);
    this.vertices.push(0, 0.3, 2);
    this.normals.push(0,1,0);
    this.normals.push(0,1,0);
    this.normals.push(0,1,0);

    this.indices.push(0, 1, 2);
    
   
    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};