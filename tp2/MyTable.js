function MyTable(scene) {
    CGFobject.call(this, scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {

        this.scene.pushMatrix(); //Save Scene

//     //1ST Leg

    this.scene.translate(0.15 + 1.5, 1.75 + 0.1, 0.15 + 1.5);    
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    
//     //2nd Leg
    this.scene.popMatrix();
        this.scene.pushMatrix();

    this.scene.translate(0.15 + 1.5, 1.75 + 0.1, 4.5 - 0.15);    //0.15 + (1.5 + 4.7), 1.75, 0.3 + 1.5)    this.scene.scale(0.3, 3.5, 0.3);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();

//     //3rd Leg
    this.scene.popMatrix();
        this.scene.pushMatrix();
    this.scene.translate(6.5 - 0.15 , 1.75 + 0.1, 0.15 + 1.5);    
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();

     //4th Leg
    this.scene.popMatrix();
        this.scene.pushMatrix();
    this.scene.translate(6.5 -0.15, 1.75 + 0.1, 4.5 - 0.15);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();


 //Tabletop
    this.scene.popMatrix();
        this.scene.pushMatrix();
    this.scene.translate(2.5 + 1.5, 0.15 + 3.5 + 0.1, 3);
    this.scene.scale(5, 0.3, 3);
    this.cube.display();

this.scene.popMatrix();

};
