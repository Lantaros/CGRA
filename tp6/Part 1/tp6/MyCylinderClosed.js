/**
 * MyCylinderClosed
 * @constructor
 */
function MyCylinderClosed(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;
MyCylinderClosed.prototype = Object.create(CGFobject.prototype);
MyCylinderClosed.prototype.constructor = MyCylinderClosed;

MyCylinderClosed.prototype.initBuffers = function() {
    /*
 	* TODO:
 	* Replace the following lines in order to build a cylinder with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a cylinder with varying number of slices and stacks?
 	*/

    var stepAng = 2 * Math.PI / this.slices;
    //step in radians	
    this.vertices = new Array();
    this.indices = new Array();
    this.normals = new Array();
    this.texCoords = new Array();

    var depth = 1.0 / this.stacks;

    for (var i = 0; i < this.stacks; i++)
        for (var j = 0; j < this.slices; j++) {
            //vertices and normals
            this.vertices.push(Math.cos(j * stepAng), Math.sin(j * stepAng), i * depth);
            this.normals.push(Math.cos(j * stepAng), Math.sin(j * stepAng), 0);

            this.vertices.push(Math.cos(j * stepAng), Math.sin(j * stepAng), (i + 1) * depth);
            this.normals.push(Math.cos(j * stepAng), Math.sin(j * stepAng), 0);
            //Normals in line with the vertexes				

            this.texCoords.push(Math.cos((j * stepAng) / 2 + 0.5), ((i + 1) / this.stacks) * (1 - (Math.sin(j * stepAng) / 2 + 0.5)));
            this.texCoords.push(Math.cos((j * stepAng) / 2 + 0.5), ((i + 2) / this.stacks) * (1 - (Math.sin(j * stepAng) / 2 + 0.5)));

            //indices
            //Ex indice: (stack atual -1) * 4 * numberSlices + 4 * slicesAtual + 0		
            this.indices.push((i * 2 * this.slices) + (2 * j) + 0);
            this.indices.push((i * 2 * this.slices) + (((2 * j) + 3) % (this.slices * 2)));
            this.indices.push((i * 2 * this.slices) + (2 * j) + 1);

            this.indices.push((i * 2 * this.slices) + (((2 * j) + 0) % (this.slices * 2)));
            //This doesn't need integer division
            this.indices.push((i * 2 * this.slices) + (((2 * j) + 2) % (this.slices * 2)));
            this.indices.push((i * 2 * this.slices) + (((2 * j) + 3) % (this.slices * 2)));
        }

    var lidVtxIdx = this.vertices.length/3;
    console.log("Lid's 1st idx " + lidVtxIdx);

    //Back lid (Z--)
    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, -1);
    this.texCoords.push(0.5, 0.5);

    for (let i = 0; i < this.slices; i++) {

        this.vertices.push(Math.cos(i * stepAng), Math.sin(i * stepAng), 0);
        this.normals.push(0, 0, -1);
        this.texCoords.push(Math.cos(i * stepAng) / 2 + 0.5, 1 - (Math.sin(i * stepAng) / 2 + 0.5));

        this.indices.push(lidVtxIdx, lidVtxIdx + i + 2, lidVtxIdx + i + 1);
    }

//     //Last point
    this.vertices.push(1, 0, 0);
    this.normals.push(0, 0, -1);
    this.texCoords.push(1, 0.5);
    this.indices.push(lidVtxIdx, lidVtxIdx + i + 2, lidVtxIdx + i + 1);


    lidVtxIdx = this.vertices.length/3;
    console.log("2 Lid's 1st idx " + lidVtxIdx);

    //Front lid (Z++)
    this.vertices.push(0, 0, 1);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5, 0.5);

    for (let i = 0; i < this.slices; i++) {

        this.vertices.push(Math.cos(i * stepAng), Math.sin(i * stepAng), 1);
        this.normals.push(0, 0, 1);
        this.texCoords.push(Math.cos(i * stepAng) / 2 + 0.5, 1 - (Math.sin(i * stepAng) / 2 + 0.5));

        this.indices.push(lidVtxIdx, lidVtxIdx + i + 1, lidVtxIdx + i + 2);
    }

     //Last point 2 Lid
    this.vertices.push(1, 0, 1);
    this.normals.push(0, 0, 1);
    this.texCoords.push(1, 0.5);
    this.indices.push(lidVtxIdx, lidVtxIdx + i + 2, lidVtxIdx + i + 1);


    console.log("Lid idx:" +  this.indices);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
