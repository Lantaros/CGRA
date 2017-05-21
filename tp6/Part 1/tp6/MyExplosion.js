function MyExplosion(scene,x,y,z) {
    CGFobject.call(this, scene);

    this.x = x;
    this.y = y;
    this.z = z;
	
	this.bodyFrt = new MyLamp(scene, 40, 4);
	this.bodyBck = new MyLamp(scene, 40, 4);
   
   	this.angle = 1;
   	this.exploded = false;
};

MyExplosion.prototype.display = function() {

   this.scene.pushMatrix();
		this.scene.translate(this.x, this.y,this.z);
		this.scene.scale(this.angle,this.angle,this.angle);
		this.scene.rotate(Math.PI/2,0,0,1);

		//body front
	   this.scene.pushMatrix();
	   	this.scene.scale(0.3,0.3,0.3);
            this.bodyFrt.display();
        this.scene.popMatrix();

        //body back
        this.scene.pushMatrix();
        	this.scene.rotate(Math.PI,1,0,0);
	   		this.scene.scale(0.3,0.3,0.3);
            this.bodyBck.display();
        this.scene.popMatrix();		
	
       this.scene.popMatrix();
	
};

MyExplosion.prototype.update = function(delta) {
   
	this.angle += (delta/1000) * 0.5;

};

