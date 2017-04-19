/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {

	var stepAng = 2*Math.PI / this.slices; //step in radians	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	var depth = 1.0/this.stacks;
	var radius = (Math.PI/4) / this.stacks; //Radius 
	var currtRadius;

 	for (var i = 0; i <this.stacks; i++){
		currtRadius = Math.cos(radius * i);
		for (var j = 0; j < this.slices; j++){
			//vertices and normals
			this.vertices.push(currtRadius * Math.cos(j*stepAng), currtRadius * Math.sin(j*stepAng),i*depth);	
			this.normals.push( currtRadius *Math.cos(j*stepAng), currtRadius * Math.sin(j*stepAng),0);	

			this.normals.push(currtRadius * Math.cos(j*stepAng), currtRadius * Math.sin(j*stepAng),0); //Normals in line with the vertexes	
			
			this.vertices.push(currtRadius * Math.cos(j*stepAng), currtRadius * Math.sin(j*stepAng),(i+1)*depth);


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
