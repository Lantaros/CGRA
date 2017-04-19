 
/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, hour = 15, min= 15, sec = 0) {
 	CGFobject.call(this,scene);

    this.frame=new MyCylinder(this.scene, 12,1);
    this.clkDisp = new MyClockDisplay(this.scene, 12);
    this.handSec = new MyClockHand(this.scene, 0, 0.5, 0.1);
 };

MyClock.prototype.display = function () {

 this.scene.pushMatrix();
 this.scene.scale(1,1,0.2); 
	 this.frame.display();
	   this.scene.popMatrix(); 
    
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.2);  
    this.scene.scale(1,1,0.5); 
    this.scene.displayAppearance.apply();
    this.clkDisp.display();
    this.scene.popMatrix(); 

	 this.scene.pushMatrix();
	 this.scene.translate(0, 0, 0.5);
   	 this.handSec.display();
   	 this.scene.popMatrix(); 
        
	this.primitiveType=this.scene.gl.TRIANGLES;
};

