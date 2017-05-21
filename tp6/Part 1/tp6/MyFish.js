/**
 * MyFish
 * @constructor
 */
 function MyFish(scene,x,y,z,angle) {
 	CGFobject.call(this,scene);

 	this.x = x;
 	this.y = y;
 	this.z = z;
	

	this.bodyFrt = new MyLamp(scene, 40, 4);
	this.bodyBck = new MyLamp(scene, 40, 4);
	this.eye = new MyLamp(scene, 40, 4);
	this.vertFin = new MyTrapezoid(scene);
	this.horFin = new MyTrapezoid(scene);


 };

 MyFish.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y,this.z);
		this.scene.rotate(Math.PI/2,0,0,1);
		//body front
	   this.scene.pushMatrix();
	   		this.scene.scale(0.2,0.1,0.4);
            this.bodyFrt.display();
        this.scene.popMatrix();

        //body back
        this.scene.pushMatrix();
        	this.scene.rotate(Math.PI,1,0,0);
	   		this.scene.scale(0.2,0.1,0.4);
            this.bodyBck.display();
        this.scene.popMatrix();

		//eye
         this.scene.pushMatrix();     
	   		this.scene.translate(0.05,-0.05,0.15);
	   		this.scene.scale(0.06,0.06,0.06);
	   	 	this.scene.rotate(Math.PI/2,1,0,0);
            this.eye.display();
        this.scene.popMatrix();

		//vertical Fin
        this.scene.pushMatrix();
        	this.scene.translate(-0.12,-0,-0.45);
        	this.scene.rotate(Math.PI/2,1,0,0);
        	this.scene.scale(0.9,0.9,0.6);
			this.vertFin.display();
        this.scene.popMatrix();

		//horizontal Fin
         this.scene.pushMatrix();
        	this.scene.translate(0,-0.08,0);
        	this.scene.rotate(Math.PI/2,0,1,0);
        	this.scene.rotate(Math.PI/2,0,0,1);
        	this.scene.scale(0.5,0.2,0.2);
			this.horFin.display();
        this.scene.popMatrix();
	
       this.scene.popMatrix();
	
 };