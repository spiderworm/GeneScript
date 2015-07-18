
export default class Demo {

  constructor(canvas, geneView) {
    this._geneView = geneView;
    this._canvas = canvas;
    this._scene = geneView.scene;

    this._renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this._camera = new THREE.PerspectiveCamera(
      45,
      canvas.offsetWidth / canvas.offsetHeight,
      .1,
      10000
    );
    this._scene.fog = new THREE.FogExp2( 0x000000, 0.0025 );
    this._scene.add(this._camera);

    this._controls = new THREE.FirstPersonControls(this._camera);
    this._controls.movementSpeed = 1;
    this._controls.lookSpeed = .2;

    this._render();
  }

  _render() {
    requestAnimationFrame(this._render.bind(this));

    if (!this._lastRender) {
      this._lastRender = +new Date();
    }
    var thisRender = +new Date();
    var delta = thisRender - this._lastRender;
    this._lastRender = thisRender;

    this._resize();

    this._controls.update(delta/1000);

    if (this._cameraTarget) {
      this._camera.lookAt(this._cameraTarget);
    }
    this._geneView.setPosition(
      this._camera.position.x,
      this._camera.position.y,
      this._camera.position.z
    );

    this._renderer.render(this._scene,this._camera);
  }

  _resize() {
    if (
      !this._canvasWidth || !this._canvasHeight ||
      this._canvasWidth !== this._canvas.offsetWidth ||
      this._canvasHeight !== this._canvas.offsetHeight
    ) {
      this._canvasWidth = this._canvas.offsetWidth;
      this._canvasHeight = this._canvas.offsetHeight;
      this._renderer.setSize( this._canvasWidth, this._canvasHeight );
      this._camera.aspect = this._canvasWidth / this._canvasHeight;
      this._camera.updateProjectionMatrix();
    }

  }

  pinCameraTarget(camera,x,y,z) {
    this._cameraTarget = new THREE.Vector3(x,y,z);
  }

}
