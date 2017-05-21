/**
 * MyFishGroup
 * @constructor
 */
 function MyFishGroup(scene,x,y,z,angle) {
 	CGFobject.call(this,scene);
	
	this.x = x;
	this.y = y;
	this.z = z;
 	this.size = 5;
	this.group = new Array();
 	for (var i = 0; i < this.size; i++){
 		var r = Math.random();
 		this.group.push(new MyFish(scene, r*x, r*y, r*z, angle));
 	}
 	this.speed = 0.5;

 };	

 MyFishGroup.prototype.display = function() {

   for (var i = 0; i < this.size; i++){
	 this.scene.pushMatrix();
	 	this.scene.translate(0,0, this.z); 
		this.group[i].display();  
      this.scene.popMatrix();
    }
};

 MyFishGroup.prototype.update = function(delta) {
	   this.z += (delta/1000) * this.speed;
};
