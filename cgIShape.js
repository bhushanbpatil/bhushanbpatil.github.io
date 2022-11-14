class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }

}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }


     drawFrontFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    this.addTriangle (-len + xmid, -len + ymid, 0.5, len + xmid, -len + ymid, 0.5, len + xmid, len + ymid, 0.5);
    this.addTriangle (-len + xmid, -len + ymid, 0.5, len + xmid, len + ymid, 0.5, -len + xmid, len + ymid, 0.5);
}

 drawBackFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    this.addTriangle (-len + xmid, -len + ymid, -0.5, -len + xmid, len + ymid, -0.5, len + xmid, len + ymid, -0.5);
    this.addTriangle (-len + xmid, -len + ymid, -0.5, len + xmid, len + ymid, -0.5, len + xmid, -len + ymid, -0.5);
}

 drawTopFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    this.addTriangle (-len + xmid, 0.5, -len + ymid,  -len + xmid, 0.5, len + ymid,  len + xmid, 0.5, len + ymid);
    this.addTriangle (-len + xmid, 0.5, -len + ymid, len + xmid, 0.5, len + ymid, len + xmid, 0.5, -len + ymid);
}

 drawBottomFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    this.addTriangle (-len + xmid, -0.5, -len + ymid,  len + xmid, -0.5, -len + ymid,  len + xmid, -0.5, len + ymid);
    this.addTriangle (-len + xmid, -0.5, -len + ymid, len + xmid, -0.5, len + ymid, -len + xmid, -0.5, len + ymid);
}

 drawRightFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    this.addTriangle ( 0.5,-len + xmid, -len + ymid,  0.5, len + xmid, -len + ymid,  0.5, len + xmid, len + ymid);
    this.addTriangle ( 0.5, -len + xmid, -len + ymid, 0.5, len + xmid, len + ymid,  0.5,-len + xmid, len + ymid);
}

 drawLeftFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    this.addTriangle ( -0.5,-len + xmid, -len + ymid,  -0.5, -len + xmid, len + ymid,  -0.5, len + xmid, len + ymid);
    this.addTriangle ( -0.5, -len + xmid, -len + ymid, -0.5, len + xmid, len + ymid,  -0.5, len + xmid, -len + ymid);
}
    
    makeCube (subdivisions)  {

    	if(subdivisions < 1){
        	subdivisions = 1;
	    }

	    var xstart = -0.5;
	    var ystart = -0.5;

	    var step = 1/subdivisions;

	    for(let row = 0; row < subdivisions; row++){
	        for(let col = 0; col < subdivisions; col ++){
	            this.drawFrontFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
	            this.drawBackFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
	            this.drawTopFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
	            this.drawBottomFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
	            this.drawRightFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
	            this.drawLeftFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
	        }
	    }
        
        // fill in your cube code here.
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
	   	if( radialdivision < 3 )
        radialdivision = 3;

    if( heightdivision < 1 )
        heightdivision = 1;

    var PI = Math.PI;
    var r = 0.5;
    var x1, x2, z1, z2, y1, y2;

    for (let i = 0; i < radialdivision; i++) { 
        x1 = r * Math.cos(i * 2 * PI / radialdivision);
        x2 = r * Math.cos((i+1) * 2 * PI / radialdivision);
        z1 = r * Math.sin(i * 2 * PI / radialdivision);
        z2 = r * Math.sin((i+1) * 2 * PI / radialdivision);

        this.addTriangle(0, -0.5, 0, x1, -0.5, z1, x2, -0.5, z2);
        this.addTriangle(x2, 0.5, z2, x1, 0.5, z1, 0, 0.5, 0);

        for (let j = 0; j < heightdivision; j++) {
            y1 = (j / heightdivision) - 0.5;
            y2 = ((j + 1) / heightdivision) -0.5;
            this.addTriangle(x1, y2, z1, x2, y2, z2, x1, y1, z1);
            this.addTriangle(x2, y2, z2, x2, y1, z2, x1, y1, z1);
        }
    }

        // fill in your cylinder code here
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    	if( radialdivision < 3 )
        radialdivision = 3;

    if( heightdivision < 1 )
        heightdivision = 1;

    var PI = Math.PI;
    var r = 0.5;
    var x1, x2, z1, z2, y1, y2;
    
    for (let i = 0; i < radialdivision; i++) { 
        x1 = r * Math.cos(i * 2 * PI / radialdivision);
        x2 = r * Math.cos((i+1) * 2 * PI / radialdivision);
        z1 = r * Math.sin(i * 2 * PI / radialdivision);
        z2 = r * Math.sin((i+1) * 2 * PI / radialdivision);

        this.addTriangle(0, -0.5, 0, x1, -0.5, z1, x2, -0.5, z2);

        var y1 = -0.5;
        var newx1 = -x1 / heightdivision;
        var newz1 = -z1 / heightdivision;
        var newx2 = -x2 / heightdivision;
        var newz2 = -z2 / heightdivision;
        var y2 = 1.0 / heightdivision;

        for (var j = 0; j < heightdivision - 1; j++) {       
            this.addTriangle(x1, y1, z1, x1+newx1, y1+y2, z1+newz1, x2, y1, z2);
            this.addTriangle(x1+newx1, y1+y2, z1+newz1, x2+newx2, y1+y2, z2+newz2, x2, y1, z2);

            x1 += newx1;
            z1 += newz1;
            x2 += newx2;
            z2 += newz2;
            y1 += y2;
        }
        this.addTriangle(x1, y1, z1, 0.0, 0.5, 0.0, x2, y1, z2);
    }
        // Fill in your cone code here.
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        // fill in your sphere code here
    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

