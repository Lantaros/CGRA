/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 /*
 	* TODO:
 	* Replace the following lines in order to build a cylinder with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a cylinder with varying number of slices and stacks?
 	*/

	var stepAng = 2*Math.PI / this.slices; //step in radians	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	var depth = 1.0/this.stacks;

 	for (var i = 0; i <this.stacks; i++)
		for (var j = 0; j < this.slices; j++){
			//vertices and normals
			this.vertices.push(Math.cos(j*stepAng),Math.sin(j*stepAng),i*depth);	
			this.normals.push(Math.cos(j*stepAng),Math.sin(j*stepAng),0);	

			this.normals.push(Math.cos(j*stepAng),Math.sin(j*stepAng),0); //Normals in line with the vertexes	
			
			this.vertices.push(Math.cos(j*stepAng), Math.sin(j*stepAng),(i+1)*depth);


	 		//indices
	 		//Ex indice: (stack atual -1) * 4 * numberSlices + 4 * slicesAtual + 0		
			this.indices.push((i*2*this.slices)+(2*j)+0);
			this.indices.push((i*2*this.slices)+(((2*j)+3)% (this.slices * 2)));
			this.indices.push((i*2*this.slices)+(2*j)+1);
		
			this.indices.push((i*2*this.slices)+(((2*j)+0) % (this.slices * 2))); //This doesn't need integer division
			this.indices.push((i*2*this.slices)+(((2*j)+2) % (this.slices * 2)));
			this.indices.push((i*2*this.slices)+(((2*j)+3) % (this.slices * 2)));

		/*	this.vertices.push(Math.cos(j*stepAng),Math.sin(j*stepAng),i*depth);	
			this.normals.push(Math.cos(j*stepAng),Math.sin(j*stepAng),0);

			this.indices.push((i)*this.slices + j + 0);
			this.indices.push((i)*this.slices + j + 5);
			this.indices.push((i)*this.slices + j + 4);

			this.indices.push((i)*this.slices + j + 0);
			this.indices.push((i)*this.slices + j + 1);
			this.indices.push(i*this.slices + j + 5);
*/
 	} 	

 /*	for (var j = 0; j < this.slices; j++){
 		this.vertices.push(Math.cos(j*stepAng),Math.sin(j*stepAng),i*depth);	
		this.normals.push(Math.cos(j*stepAng),Math.sin(j*stepAng),0);
 	}
*/

	
	//DEBUG
//  	console.log("vertices: " + this.vertices.length + "   " + this.vertices + "\n");
// 	console.log("normals: " +  this.normals.length + "   " +  this.normals + "\n");
// 	console.log("indices: " + this.indices.length + "  " + this.indices + "\n");
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
