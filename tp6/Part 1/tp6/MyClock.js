 
/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, hour = 15, min= 30, sec = 45) {
 	CGFobject.call(this,scene);

    this.frame=new MyCylinder(this.scene, 12,1);
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
    this.scene.translate(0,0,0.2);  
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

MyClock.prototype.update = function (currTime) {
	//console.log(currTime);
	if((Math.round(currTime / 100) % 10) == 0){
		this.handSec.addAngle((1/60)* 360);
		this.handMin.addAngle((1/60/60)* 360);
		this.handHour.addAngle((1/3600)* 360);
	}

};