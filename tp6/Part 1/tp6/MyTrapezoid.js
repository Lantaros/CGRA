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
    this.texCoords = new Array();


    //Rectangle (z++) Z = 0.1
    this.vertices.push(0, 0,  0.1);
        this.texCoords.push(0, 1);
    this.vertices.push(0.3, 0.25, 0.1);
        this.texCoords.push(1, 0);
    this.vertices.push(0, 0.25, 0.1);
        this.texCoords.push(0, 0);
    this.vertices.push(0.3, 0, 0.1);    
        this.texCoords.push(1, 1);

    this.indices.push(0, 1, 2);
    this.indices.push(0, 3, 1)
    
    //Right Triangle  (z++) Z = 0.1
    this.vertices.push(0.5, 0, 0.1);//4
    this.texCoords.push(1, 1);

     for(let i = 0; i < 5; i++)
        this.normals.push(0, 0, 1);

     //Rectangle (z--) Z = -0.1
    this.vertices.push(0, 0,  -0.1); //5
    this.vertices.push(0.3, 0.25, -0.1);
    this.vertices.push(0, 0.25, -0.1);
    this.vertices.push(0.3, 0, -0.1);

    this.indices.push(7, 6, 5);
    this.indices.push(6, 8, 5)
    

    this.texCoords.push(0, 1);
    this.texCoords.push(1, 0);
    this.texCoords.push(0, 0);
    this.texCoords.push(1, 1);


    //Right Triangle (z--) Z = -0.1
    this.vertices.push(0.5, 0, -0.1);
    this.indices.push(6, 9, 8);
    this.texCoords.push(0, 1);

     for(let i = 0; i < 5; i++)
        this.normals.push(0, 0, -1);

//---------------------------------------
     //Left Triangle  (z++) Z = 0.1
    this.vertices.push(-0.2, 0, 0.1); //10
    this.indices.push(0, 2, 10);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0, 1);

    //Left Triangle  (z--) Z = -0.1
    this.vertices.push(-0.2, 0, -0.1); //11
    this.indices.push(11, 7, 5);
    this.normals.push(0, 0, -1);
    this.texCoords.push(1, 1);
    
    

 /*---------------------------------------*/
     //Defining and Indexing sides
     //Bottom
    this.vertices.push(-0.2, 0, 0.1); //12
    this.vertices.push(0.5, 0, 0.1);
    this.vertices.push(-0.2, 0, -0.1);//14
    this.vertices.push(0.5, 0, -0.1);

    this.texCoords.push(0, 1);
    this.texCoords.push(1, 1);
    this.texCoords.push(0, 0);
    this.texCoords.push(1, 0);

    this.indices.push(14, 15, 13);
    this.indices.push(14, 13, 12);
    for(let i = 0; i < 4; i++)
        this.normals.push(0, -1, 0);

    //--
     //Top Parallelepiped
    this.vertices.push(0, 0.25, 0.1); //16
    this.vertices.push(0.3, 0.25, 0.1);
    this.vertices.push(0.3, 0.25, -0.1);
    this.vertices.push(0, 0.25, -0.1);

    this.indices.push(16, 18, 19);
    this.indices.push(16, 17, 18);
    for(let i = 0; i < 4; i++)
        this.normals.push(0, 1, 0);

    this.texCoords.push(1, 0);
    this.texCoords.push(1, 1);
    this.texCoords.push(0, 1);
    this.texCoords.push(0, 0);
    

    //Top Right trianglular prism
    this.vertices.push(0.3, 0.25, 0.1); //20
    this.vertices.push(0.5, 0, 0.1);
    this.vertices.push(0.5, 0, -0.1);
    this.vertices.push(0.3, 0.25, -0.1);

    this.indices.push(20, 21, 22);
    this.indices.push(20, 22, 23);
    for(let i = 0; i < 4; i++)
        this.normals.push(1, 1, 0);

    this.texCoords.push(1, 0);//24 texCoord
    this.texCoords.push(1, 1);
    this.texCoords.push(0, 1);
    this.texCoords.push(0, 0);
   
    
    //Top Left trianglular prism
    this.vertices.push(0, 0.25, 0.1); //24
    this.vertices.push(-0.2, 0, 0.1);
    this.vertices.push(-0.2, 0, -0.1);
    this.vertices.push(0, 0.25, -0.1);

    this.indices.push(24, 27, 26);
    this.indices.push(24, 26, 25);
    for(let i = 0; i < 4; i++)
        this.normals.push(-1, -1, 0);

  
    this.texCoords.push(1, 0);
    this.texCoords.push(1, 1);
    this.texCoords.push(0, 1);
    this.texCoords.push(0, 0);


//---------------------------------------
    //Left Triangle extra fix (z++) Z = 0.1
    this.vertices.push(0, 0, 0.1); //28
    this.vertices.push(0, 0.25, 0.1); //29
    this.normals.push(0, 0, 1);
    this.normals.push(0, 0, 1);
    
    this.indices.push(28, 29, 10);
    this.texCoords.push(1, 1);
    this.texCoords.push(1, 0);


    //Right Triangle extra fix (z++) Z = 0.1
    this.vertices.push(0.3, 0.25, 0.1);//30
    this.vertices.push(0.3, 0, 0.1);//31
    this.texCoords.push(0, 0);
    this.texCoords.push(0, 1);

    this.indices.push(30, 31, 4);
    
    for(let i = 0; i < 2; i++)
        this.normals.push(0, 0, 1);

 /*---------------------------------------*/

    this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};