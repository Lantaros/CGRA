 /**
 * MyClock
 * @constructor
 */
 function MyClock(scene, hour = 15, min= 30, sec = 45) {
 	CGFobject.call(this,scene);

    this.frame =new MyCylinderClosed(this.scene, 12,1);
    this.clkDisp = new MyClockDisplay(this.scene, 12);
    this.handSec = new MyClockHand(this.scene, sec*(360/60), 0.8, 0.03);
    this.handMin = new MyClockHand(this.scene, min*(360/60), 0.54, 0.08);
    this.handHour = new MyClockHand(this.scene, ((hour % 12) + min/60)*(360/12), 0.3, 0.08);
 };

MyClock.prototype.display = function () {

 this.scene.pushMatrix();
 this.scene.scale(1,1,0.2); 
	 this.frame.display();
	 this.scene.popMatrix(); 
    
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.205);  
    this.scene.scale(1,1,0.5); 
    this.scene.displayAppearance.apply();
    this.clkDisp.display();
    this.scene.popMatrix(); 

	//Clock-Hands
        this.scene.pushMatrix();
	 this.scene.translate(0, 0, 0.3);
   	 this.handHour.display();
   	 this.scene.popMatrix(); 

        this.scene.pushMatrix();
	 this.scene.translate(0, 0, 0.3);
   	 this.handMin.display();
   	 this.scene.popMatrix(); 

        this.scene.pushMatrix();
	 this.scene.translate(0, 0, 0.3);
   	 this.handSec.display();
   	 this.scene.popMatrix(); 
        
	this.primitiveType=this.scene.gl.TRIANGLES;
};

MyClock.prototype.update = function (delta) {
	var ang = delta/1000 * 360;
		this.handSec.addAngle(ang/60);
		this.handMin.addAngle(ang/60/60);
		this.handHour.addAngle(ang/60/60/12);
};