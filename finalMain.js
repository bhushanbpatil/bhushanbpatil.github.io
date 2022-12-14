  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // GLSL programs
  let moonProgram;
  let earthProgram;
  let deathStarProgram
  
  // VAOs for the objects
  var myCube = null;
  var mySphere = null;
  var mySphere2 = null;
  var mySphere3 = null;
  var myCone = null;

  //translation
  var translationState = true;

  // textures
  var textures = {moon:{value:null}, earth:{value:null}, deathStar:{value:null}};

  // rotation
 
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
    myCube = new Cube (20);
    myCube.VAO = bindVAO (myCube, earthProgram);

    myCone = new Cone(20,20);
    myCone.VAO = bindVAO(myCone, earthProgram);

    mySphere = new Sphere (20,20);
    mySphere.VAO = bindVAO (mySphere, moonProgram);

    mySphere2 = new Sphere (20,20);
    mySphere2.VAO = bindVAO (mySphere2, earthProgram);

    mySphere3 = new Sphere (20,20);
    mySphere3.VAO = bindVAO (mySphere3, earthProgram);
}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
    
    gl.useProgram (program);
    

    // set up your projection
    let projMatrix = glMatrix.mat4.create();
    glMatrix.mat4.ortho(projMatrix, -1, 1, -1, 10, 10.0, 300.0);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    
    // set up your view
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
    
    // set up your projection
    
    // set up your view

}

function doLoad(theTexture, theImage) {
    gl.bindTexture(gl.TEXTURE_2D, theTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,gl.RGBA, gl.UNSIGNED_BYTE, theImage);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    draw();
}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextureHelper(theTexture, textureLink){
  // // flip Y for WebGL
    // gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);

    // get some texture space from the gpu
    
    theTexture.value = gl.createTexture();
    
    // load the actual image
    
    const worldImage = new Image();
    worldImage.src = textureLink;
    worldImage.crossOrigin = 'anonymous';

    worldImage.onload = () => {
        doLoad (theTexture.value, worldImage);
    };

}

function setUpTextures(textureLink, myTexture){
   setUpTextureHelper(myTexture, textureLink);
}


function translateShapes(program){
    const uniformLocations = {
      matrix: gl.getUniformLocation(program, 'matrix'),
    };
    
    const matrix = glMatrix.mat4.create();
    glMatrix.mat4.scale(matrix, matrix, [0.5,0.5,0.5]);
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix);
}

//
//  This function draws all of the shapes required for your scene
//
const matrix = glMatrix.mat4.create();
const matrix2 = glMatrix.mat4.create();
const matrix3 = glMatrix.mat4.create();
const normalMatrix = glMatrix.mat4.create();
var x = 0.0;
var y = 0.0;
var z = 0.0;
var count = 0;
var moonTransFactor = 0.03;
function drawShapes() {
    var object = mySphere;
    var object2 = mySphere2;
    var object3 = mySphere3;
    
    // // which program are we using
    var program = moonProgram;
    gl.useProgram (program);    
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, textures.moon.value);
    gl.uniform1i (program.uTheTexture, 0);

    const uniformLocations = {
      matrix: gl.getUniformLocation(program, 'matrix'),
      normalMatrix: gl.getUniformLocation(program, `normalMatrix`),
    };

    if(translationState){
      glMatrix.mat4.scale(matrix, matrix, [0.3,0.3,0.3]);
      glMatrix.mat4.translate(matrix,matrix, [x,y,2.5]);
    }    

    glMatrix.mat4.translate(matrix,matrix, [moonTransFactor,0,0]);
    glMatrix.mat4.rotateY(matrix,matrix, Math.PI / 2/ 150);

    glMatrix.mat4.invert(normalMatrix, matrix);
    glMatrix.mat4.transpose(normalMatrix, normalMatrix);

    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix);
    gl.uniformMatrix4fv(uniformLocations.normalMatrix, false, normalMatrix);

    gl.bindVertexArray(object.VAO);
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

    var program = deathStarProgram;
    gl.useProgram (program);    
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, textures.deathStar.value);
    gl.uniform1i (program.uTheTexture, 0);

    const uniformLocations3 = {
      matrix: gl.getUniformLocation(program, 'matrix'),
      normalMatrix: gl.getUniformLocation(program, `normalMatrix`),
    };

    if(translationState){
      glMatrix.mat4.scale(matrix3, matrix3, [0.1,0.1,0.1]);
      glMatrix.mat4.translate(matrix3,matrix3, [0.0,0.0,-5.0]);
    }    

    glMatrix.mat4.translate(matrix3,matrix3, [0,0.2,0]);
    glMatrix.mat4.rotateX(matrix3,matrix3, Math.PI / 2/ 50);

    glMatrix.mat4.invert(normalMatrix, matrix3);
    glMatrix.mat4.transpose(normalMatrix, normalMatrix);

    gl.uniformMatrix4fv(uniformLocations3.matrix, false, matrix3);
    gl.uniformMatrix4fv(uniformLocations3.normalMatrix, false, normalMatrix);

    gl.bindVertexArray(object3.VAO);
    gl.drawElements(gl.TRIANGLES, object3.indices.length, gl.UNSIGNED_SHORT, 0);


    //---------------------------------------------------------------------------------------------
    var program = earthProgram;
    gl.useProgram (program); 
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, textures.earth.value);
    gl.uniform1i (program.uTheTexture, 0);

    const uniformLocations2 = {
      matrix: gl.getUniformLocation(program, 'matrix'),
      normalMatrix: gl.getUniformLocation(program, `normalMatrix`),
    };

    
    glMatrix.mat4.rotateY(matrix2,matrix2, -Math.PI / 2/ 90);

    glMatrix.mat4.invert(normalMatrix, matrix2);
    glMatrix.mat4.transpose(normalMatrix, normalMatrix) + 10;

    gl.uniformMatrix4fv(uniformLocations2.matrix, false, matrix2);
    gl.uniformMatrix4fv(uniformLocations2.normalMatrix, false, normalMatrix);

    gl.bindVertexArray(object2.VAO);
    gl.drawElements(gl.TRIANGLES, object2.indices.length, gl.UNSIGNED_SHORT, 0);

    

    //=--------------------------------------------------------


    translationState = false;
}


  //
  // Use this function to create all the programs that you need
  // You can make use of the auxillary function initProgram
  // which takes the name of a vertex shader and fragment shader
  //
  // Note that after successfully obtaining a program using the initProgram
  // function, you will beed to assign locations of attribute and unifirm variable
  // based on the in variables to the shaders.   This will vary from program
  // to program.
  //
  function initPrograms(){
      moonProgram = initProgram('wireframe-V', 'wireframe-F');
      setUpTextures("https://raw.githubusercontent.com/bhushanbpatil/bhushanbpatil.github.io/main/2k_moon.jpg", textures.moon)

      earthProgram = initProgram('wireframe-V', 'wireframe-F');
      setUpTextures("https://raw.githubusercontent.com/bhushanbpatil/bhushanbpatil.github.io/main/1_earth_16k.jpg ", textures.earth)

      deathStarProgram = initProgram('wireframe-V', 'wireframe-F');
      setUpTextures("https://raw.githubusercontent.com/bhushanbpatil/bhushanbpatil.github.io/main/fireball.jpg", textures.deathStar)

      // setUpCamera(moonProgram);
      // setUpCamera(earthProgram);
      // setUpCamera(deathStarProgram);
  }


// creates a VAO and returns its ID
function bindVAO (shape, program) {
    //create and bind VAO
    let theVAO = gl.createVertexArray();
    gl.bindVertexArray(theVAO);
    
    // create and bind vertex buffer
    let myVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

    // create, bind, and fill buffer for normal values
    // normals can be obtained from the normals member of the
    // shape object.  3 floating point values (x,y,z) per vertex are
    // stored in this array.
    let myNormalBuffer = gl.createBuffer();
    gl.enableVertexAttribArray(program.aNormal);
    gl.bindBuffer(gl.ARRAY_BUFFER, myNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.normals), gl.STATIC_DRAW);
    
    gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
    
    // add code for any additional vertex attribute
    // create, bind, and fill buffer for uv's
    // uvs can be obtained from the uv member of the
    // shape object.  2 floating point values (u,v) per vertex are
    // stored in this array.
    let uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aUV);
    gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);

    
    // Setting up the IBO
    let myIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
    return theVAO;
}


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
  const script = document.getElementById(id);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if (script.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if (script.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else {
    return null;
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }

    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aUV = gl.getAttribLocation(program, 'aUV');
      
    // uniforms - you will need to add references for any additional
    // uniforms that you add to your shaders
    program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
    program.uTheta = gl.getUniformLocation (program, 'theta');

    //-----------------------------------------------------
    //-----------------------------------------------------
      
    return program;
  }


  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    // gl.cullFace(gl.BACK);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(10.0)
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);

    // Read, compile, and link your shaders
    initPrograms();

    
    // create and bind your current object
    createShapes();

    
    // do a draw
    function animate(){
      requestAnimationFrame(animate);
      draw();
    }
    animate()
  }
