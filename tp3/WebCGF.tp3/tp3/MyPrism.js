/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 /*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
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
			this.normals.push(Math.cos((j+1)*stepAng - stepAng/2),Math.sin((j+1)*stepAng - stepAng/2),0);	

			this.vertices.push(Math.cos((j+1)*stepAng), Math.sin((j+1)*stepAng), i*depth);
			this.normals.push(Math.cos((j+1)*stepAng - stepAng/2),Math.sin((j+1)*stepAng - stepAng/2),0);	
			
			this.vertices.push(Math.cos(j*stepAng), Math.sin(j*stepAng),(i+1)*depth);
			this.normals.push(Math.cos((j+1)*stepAng - stepAng/2),Math.sin((j+1)*stepAng - stepAng/2),0);	

			this.vertices.push(Math.cos((j+1)*stepAng), Math.sin((j+1)*stepAng),(i+1)*depth);
			this.normals.push(Math.cos((j+1)*stepAng - stepAng/2),Math.sin((j+1)*stepAng - stepAng/2),0);	

	 		//indices
	 		//Ex indice: (stack atual -1) * 4 * numberSlices + 4 * slicesAtual + 0		
			this.indices.push((i*4*this.slices)+(4*j)+0);
			this.indices.push((i*4*this.slices)+(4*j)+1);
			this.indices.push((i*4*this.slices)+(4*j)+2);
		
			this.indices.push((i*4*this.slices)+(4*j)+1);
			this.indices.push((i*4*this.slices)+(4*j)+3);
			this.indices.push((i*4*this.slices)+(4*j)+2);
 	} 	
	
	//DEBUG
//  	console.log("vertices: " + this.vertices.length + "   " + this.vertices + "\n");
// 	console.log("normals: " +  this.normals.length + "   " +  this.normals + "\n");
// 	console.log("indices: " + this.indices.length + "  " + this.indices + "\n");
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
