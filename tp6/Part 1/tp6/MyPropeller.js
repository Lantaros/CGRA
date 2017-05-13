/**
 * MyPropeller
 * @constructor
 */


 function MyPropeller(scene) {
 	CGFobject.call(this,scene); 	

    this.rec = new MyUnitCubeQuad(scene);
	this.sphr = new MyLamp(scene, 40, 4);
	this.cyl = new MyCylinder(scene, 40, 4);
    this.ang = 0;
    this.diameter= 0.4;

 };


MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor=MyPropeller;


MyPropeller.prototype.display = function() {
    
    //Propeller Rec
    this.scene.pushMatrix();  		
      
        this.scene.scale(0.75, 0.12, 0.03); 
      //  this.scene.rotate(-this.angle*Math.PI/180 + Math.PI/2,0, 0, 1);           
        this.scene.rotate(this.ang,0,0,1);    
       // this.scene.translate(0,0,0.2);
        this.rec.display();
    this.scene.popMatrix();

    //Propeller Sphere
    this.scene.pushMatrix();
       // this.scene.translate(0,-0.0001,0.2);
        this.scene.scale(0.06, 0.06, 0.06);
        this.sphr.display();
    this.scene.popMatrix();

    //Propeller Cylinder
    this.scene.pushMatrix();
        this.scene.translate(0,-0.0001,0.01);
        this.scene.scale(this.diameter,this.diameter,this.diameter);
        this.scene.pushMatrix();
            this.scene.scale(-1,1, 1);
            this.cyl.display();
        this.scene.popMatrix();
        this.cyl.display();
    this.scene.popMatrix();
};

MyPropeller.prototype.rotate = function(angle) {
	//if (speed == 0.2)
	//	{
			//if((Math.round(currTime / 100) % 10) == 0)
			//	this.ang = (this.ang + (1/60)* 360) % 360;
		
		/*window.setInterval(function() {
			 this.ang += Math.PI/10;
			// this.scene.rotate(this.ang, 0,0,1);
		},1000);	*/	
		// this.ang += Math.PI/100;
		 
		//}
	/*let newAng = this.ang + angle;
    if (newAng > 2 * Math.PI)
        this.ang = newAng - 2 * Math.PI;
    else
        this.ang = newAng;*/
	console.log("here");
         this.ang = (this.ang + angle) % 360;
};