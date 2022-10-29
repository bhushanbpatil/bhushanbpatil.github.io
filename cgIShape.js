//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//

function drawFrontFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    addTriangle (-len + xmid, -len + ymid, 0.5, len + xmid, -len + ymid, 0.5, len + xmid, len + ymid, 0.5);
    addTriangle (-len + xmid, -len + ymid, 0.5, len + xmid, len + ymid, 0.5, -len + xmid, len + ymid, 0.5);
}

function drawBackFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    addTriangle (-len + xmid, -len + ymid, -0.5, -len + xmid, len + ymid, -0.5, len + xmid, len + ymid, -0.5);
    addTriangle (-len + xmid, -len + ymid, -0.5, len + xmid, len + ymid, -0.5, len + xmid, -len + ymid, -0.5);
}

function drawTopFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    addTriangle (-len + xmid, 0.5, -len + ymid,  -len + xmid, 0.5, len + ymid,  len + xmid, 0.5, len + ymid);
    addTriangle (-len + xmid, 0.5, -len + ymid, len + xmid, 0.5, len + ymid, len + xmid, 0.5, -len + ymid);
}

function drawBottomFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    addTriangle (-len + xmid, -0.5, -len + ymid,  len + xmid, -0.5, -len + ymid,  len + xmid, -0.5, len + ymid);
    addTriangle (-len + xmid, -0.5, -len + ymid, len + xmid, -0.5, len + ymid, -len + xmid, -0.5, len + ymid);
}

function drawRightFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    addTriangle ( 0.5,-len + xmid, -len + ymid,  0.5, len + xmid, -len + ymid,  0.5, len + xmid, len + ymid);
    addTriangle ( 0.5, -len + xmid, -len + ymid, 0.5, len + xmid, len + ymid,  0.5,-len + xmid, len + ymid);
}

function drawLeftFace(xmid, ymid, subdivisions){
    var len = 0.5/subdivisions;
    addTriangle ( -0.5,-len + xmid, -len + ymid,  -0.5, -len + xmid, len + ymid,  -0.5, len + xmid, len + ymid);
    addTriangle ( -0.5, -len + xmid, -len + ymid, -0.5, len + xmid, len + ymid,  -0.5, len + xmid, -len + ymid);
}

function makeCube (subdivisions)  {

    if(subdivisions < 1){
        subdivisions = 1;
    }

    var xstart = -0.5;
    var ystart = -0.5;

    var step = 1/subdivisions;

    for(let row = 0; row < subdivisions; row++){
        for(let col = 0; col < subdivisions; col ++){
            drawFrontFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
            drawBackFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
            drawTopFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
            drawBottomFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
            drawRightFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
            drawLeftFace((xstart + (row*step)) + (step/2), (ystart + (col*step))+(step/2), subdivisions);
        }
    }
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
1
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

        addTriangle(0, -0.5, 0, x1, -0.5, z1, x2, -0.5, z2);
        addTriangle(x2, 0.5, z2, x1, 0.5, z1, 0, 0.5, 0);

        for (let j = 0; j < heightdivision; j++) {
            y1 = (j / heightdivision) - 0.5;
            y2 = ((j + 1) / heightdivision) -0.5;
            addTriangle(x1, y2, z1, x2, y2, z2, x1, y1, z1);
            addTriangle(x2, y2, z2, x2, y1, z2, x1, y1, z1);
        }
    }
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    // fill in your code here.
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

        addTriangle(0, -0.5, 0, x1, -0.5, z1, x2, -0.5, z2);

        var y1 = -0.5;
        var newx1 = -x1 / heightdivision;
        var newz1 = -z1 / heightdivision;
        var newx2 = -x2 / heightdivision;
        var newz2 = -z2 / heightdivision;
        var y2 = 1.0 / heightdivision;

        for (var j = 0; j < heightdivision - 1; j++) {       
            addTriangle(x1, y1, z1, x1+newx1, y1+y2, z1+newz1, x2, y1, z2);
            addTriangle(x1+newx1, y1+y2, z1+newz1, x2+newx2, y1+y2, z2+newz2, x2, y1, z2);

            x1 += newx1;
            z1 += newz1;
            x2 += newx2;
            z2 += newz2;
            y1 += y2;
        }
        addTriangle(x1, y1, z1, 0.0, 0.5, 0.0, x2, y1, z2);
    }
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

