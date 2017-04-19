/**
 * MyClockHand
 * @constructor
 */
 function MyClockHand(scene, angle = 0, scaleX = 1, scaleY = 1) {
 	CGFobject.call(this,scene);
 	this.scaleX = scaleX;
 	this.scaleY = scaleY;
    this.angle = angle;
    this.hand = new MyTriangle(scene);
 };

 MyClockHand.prototype.display = function() {
   this.scene.pushMatrix();
   this.scene.rotate(-this.angle*Math.PI/180 + Math.PI/2, 0, 0, 1);
   this.scene.translate(this.scaleX*0.5, this.scaleY*0.5, 0);
   this.scene.scale(this.scaleX, this.scaleY, 1.2);
   this.scene.translate(-0.5, -0.5, 0);
   this.hand.display();
     this.scene.popMatrix();
};

 MyClockHand.prototype.setAngle = function(angle) {
    this.angle = angle;
 }; 