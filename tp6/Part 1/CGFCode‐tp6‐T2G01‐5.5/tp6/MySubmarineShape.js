/**
 * MySubmarineShape
 * @constructor
 */
function MySubmarineShape(scene) {
    CGFobject.call(this, scene);

    this.bodyCylinder = new MyCylinderClosed(scene, 40, 4);
    this.frontSphr = new MyLamp(scene, 40, 4);
    this.backSphr = this.frontSphr;
    this.tower = this.bodyCylinder;
    this.periVert = this.bodyCylinder;
    this.periHor = this.bodyCylinder;
    this.towerFin = new MyTrapezoid(scene);
    this.backFinHor = new MyTrapezoid(scene);
    this.backFinVert = new MyTrapezoid(scene);
	this.leftPropeller = new MyPropeller(scene);
	this.rightPropeller = new MyPropeller(scene);

	this.MIN_SPEED = 0.2;
	this.MAX_SPEED = 3;

	this.PERI_MAX = 0.1;
	this.PERI_MIN = -0.6;
	this.PERI_SCALE = 0;

	this.vertFinAng = 0;
	this.horFinAng = 0;
	
};

MySubmarineShape.prototype.display = function() {

   //Body
  this.scene.pushMatrix();
    this.scene.scale(0.73 , 1, 4.08);
    this.bodyCylinder.display();
  this.scene.popMatrix();

   //Front
   this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(0.73, 1, 1);
    this.frontSphr.display();
  this.scene.popMatrix();

   //Back
   this.scene.pushMatrix();
    this.scene.translate(0, 0, 4.08);
    this.scene.scale(0.73, 1, 1);
    this.frontSphr.display();
  this.scene.popMatrix();

  //BackFinHor
  this.scene.pushMatrix();
   this.scene.rotate(this.horFinAng, 1,0,0);
    this.scene.translate(-0.85,0.14,0-0.3);
    this.scene.scale(5.5, 0.8, 1.5);
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.translate(0,0.125,0);
    this.backFinHor.display();
  this.scene.popMatrix();

   //BackFinVert
  this.scene.pushMatrix();
    this.scene.rotate(this.vertFinAng, 0,1,0);
    this.scene.translate(0,-0.75,0);
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.scene.scale(5.5, 1, 1);
    this.backFinVert.display();
  this.scene.popMatrix();
 
  //Tower
  this.scene.pushMatrix();
    this.scene.translate(0, 0.72, 0.88/2 + 2);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 0.57+0.2);
    this.tower.display();
  this.scene.popMatrix();
 
  //TowerFin
  this.scene.pushMatrix();
    this.scene.translate(-0.51,1.1+0.05,1.6+1);
    this.scene.scale(3.4, 0.5, 1.5);
   this.scene.rotate(this.horFinAng, 1,0,0);
    this.scene.rotate(Math.PI/2, -1,0,0);
    this.towerFin.display();
  this.scene.popMatrix();
  
  //Periscope Vertical
  this.scene.pushMatrix();
	this.scene.translate(0, 1.2+0.2, 1.2+1.5);
    this.scene.scale(0.08, this.PERI_SCALE + 1, 0.08);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.periVert.display();
  this.scene.popMatrix();

  //Periscope Horizontal
  this.scene.pushMatrix();
	this.scene.translate(0, this.PERI_SCALE + 1.2 + 0.9 + 0.2, 1.2 - 0.23+1.5 + 0.15);
    this.scene.scale(0.08, 0.08, 0.31);
    this.periVert.display();
  this.scene.popMatrix();

  //Left Propeller
  this.scene.pushMatrix();
  	this.scene.translate(-1.06,-0.5,0);
    this.leftPropeller.display();
  this.scene.popMatrix();

  //Right Propeller
  this.scene.pushMatrix();
  	this.scene.translate(1.06,-0.5,0);
    this.rightPropeller.display();
  this.scene.popMatrix();

};

MySubmarineShape.prototype.update = function(speed, delta) {
	//Minimum speed
	if (speed == this.MIN_SPEED){
		this.leftPropeller.rotate(2*Math.PI * (delta/1000));
		this.rightPropeller.rotate(-2*Math.PI *(delta/1000));
	}
	else if (speed == -this.MIN_SPEED){
		this.leftPropeller.rotate(-2*Math.PI * (delta/1000));
		this.rightPropeller.rotate(2*Math.PI *(delta/1000));
	}
	else if (speed > this.MIN_SPEED){
		this.leftPropeller.rotate(2*Math.PI * (delta/1000) * (1+speed));
		this.rightPropeller.rotate(-2*Math.PI *(delta/1000) * (1+speed));
	}
	else if (speed < -this.MIN_SPEED){
		this.leftPropeller.rotate(-2*Math.PI * (delta/1000) * (1-speed));
		this.rightPropeller.rotate(2*Math.PI *(delta/1000) * (1-speed));
	}
	//Fin Animations
		//Vertical
		if (this.scene.rotFinLeft){
			if (this.vertFinAng < Math.PI/3)
				this.vertFinAng+=  3 * degToRad;		
		}
		else if (this.scene.rotFinRight) {
			if (this.vertFinAng > -Math.PI/3)
				this.vertFinAng -= 3 * degToRad;
		}

		else { //back to initial position
			if (this.vertFinAng > 0){
				if (this.vertFinAng < 1*degToRad)
					this.vertFinAng = 0;
				else
					this.vertFinAng -=  3* degToRad;
			}
			else if (this.vertFinAng < 0){
				if (this.vertFinAng > -1*degToRad)
					this.vertFinAng = 0;
				else
					this.vertFinAng +=  3* degToRad;
			}
		}
		
		//Horizontal
		if (this.scene.rotFinUp){
			if (this.horFinAng> -Math.PI/8)
				this.horFinAng -= 1.25 * degToRad;		
		}
		else if (this.scene.rotFinDown) {
			if (this.horFinAng < Math.PI/8)
				this.horFinAng += 1.25 * degToRad;
		}

		else { //back to initial position
			if (this.horFinAng > 0){
				if (this.horFinAng < 1*degToRad)
					this.horFinAng = 0;
				else
					this.horFinAng -= 1* degToRad;
			}
			else if (this.horFinAng < 0){
				if (this.horFinAng > -1*degToRad)
					this.horFinAng = 0;
				else
					this.horFinAng += 1* degToRad;
			}
	}
	
};

MySubmarineShape.prototype.periscopeUp = function(){
	if (this.PERI_SCALE <= this.PERI_MAX)
		this.PERI_SCALE+=0.1;
};
MySubmarineShape.prototype.periscopeDown = function(){
	if (this.PERI_SCALE >= this.PERI_MIN)
		this.PERI_SCALE-=0.1;
};