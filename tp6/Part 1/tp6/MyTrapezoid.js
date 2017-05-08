/**
 * MyTrapezoid
 * @constructor
 */
 function MyTrapezoid(scene) {
 	CGFobject.call(this,scene);
 	this.initBuffers();
 };

MyTrapezoid.prototype = Object.create(CGFobject.prototype);
MyTrapezoid.prototype.constructor=MyTrapezoid;

MyTrapezoid.prototype.initBuffers = function() {
    
    this.vertices = new Array();
    this.normals = new Array();
    this.indices = new Array();
    //this.texCoords = new Array();


    //Rectangle (z++) Z = 0.1
    this.vertices.push(0, 0,  0.1);
    this.vertices.push(0.3, 0.25, 0.1);
    this.vertices.push(0, 0.25, 0.1);
    this.vertices.push(0.3, 0, 0.1);

    this.indices.push(0, 1, 2);
    this.indices.push(0, 3, 1)
    
    //Triangle (z++) Z = 0.1
    this.vertices.push(0.5, 0, 0.1);
    this.indices.push(3, 4, 1);

     for(let i = 0; i < 6; i++)
        this.normals.push(0, 0, 1);
    
    //--------------------------------------------
    
     //Rectangle (z--) Z = -0.1
    this.vertices.push(0, 0,  -0.1);
    this.vertices.push(0.3, 0.25, -0.1);
    this.vertices.push(0, 0.25, -0.1);
    this.vertices.push(0.3, 0, -0.1);

    this.indices.push(7, 6, 5);
    this.indices.push(6, 8, 5)
    
    //Triangle (z--) Z = -0.1
    this.vertices.push(0.5, 0, -0.1);
    this.indices.push(6, 9, 8);

     for(let i = 0; i < 6; i++)
        this.normals.push(0, 0, -1);
    

 /*---------------------------------------*/
     //Defining and Indexing sides
     //Bottom
    this.vertices.push(0, 0, 0.1); //10
    this.vertices.push(0.5, 0, 0.1);
    this.vertices.push(0, 0, -0.1);
    this.vertices.push(0.5, 0, -0.1);

    this.indices.push(12, 11, 10);
    this.indices.push(12, 13, 11);
    for(let i = 0; i < 5; i++)
        this.normals.push(0, -1, 0);
   

    //--
     //Left Side
    this.vertices.push(0, 0, 0.1); //14
    this.vertices.push(0, 0.25, 0.1);
    this.vertices.push(0, 0.25, -0.1);
    this.vertices.push(0, 0, -0.1);

    this.indices.push(14, 15, 16);
    this.indices.push(14, 16, 17);
    for(let i = 0; i < 5; i++)
        this.normals.push(-1, 0, 0);
    

    //--
     //Top Parallelepiped
    this.vertices.push(0, 0.25, 0.1); //18
    this.vertices.push(0.3, 0.25, 0.1);
    this.vertices.push(0.3, 0.25, -0.1);
    this.vertices.push(0, 0.25, -0.1);

    this.indices.push(18, 19, 20);
    this.indices.push(18, 20, 21);
    for(let i = 0; i < 5; i++)
        this.normals.push(0, 1, 0);
    

    //Top trianglular prism
    this.vertices.push(0.3, 0.25, 0.1); //22
    this.vertices.push(0.5, 0, 0.1);
    this.vertices.push(0.5, 0, -0.1);
    this.vertices.push(0.3, 0.25, -0.1);

    this.indices.push(22, 23, 24);
    this.indices.push(22, 24, 25);
    for(let i = 0; i < 5; i++)
        this.normals.push(1, 1, 0);
     
   
    
    this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};