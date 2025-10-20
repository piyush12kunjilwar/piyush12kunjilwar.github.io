(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !window.THREE) return;

  const { Scene, PerspectiveCamera, WebGLRenderer, IcosahedronGeometry, MeshPhongMaterial, Mesh, AmbientLight, PointLight, Color, AdditiveBlending } = THREE;
  const scene = new Scene();
  scene.background = new Color(0x0b0f17);

  const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 32;

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new IcosahedronGeometry(12, 2);
  const material = new MeshPhongMaterial({ color: 0x1f3b73, emissive: 0x0a1222, shininess: 80, blending: AdditiveBlending, wireframe: true, transparent: true, opacity: 0.3 });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const ambient = new AmbientLight(0x446688, 0.6);
  const point = new PointLight(0x22d3ee, 1.2);
  point.position.set(20, 20, 20);
  scene.add(ambient, point);

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  let t = 0;
  const animate = () => {
    t += 0.0035;
    mesh.rotation.x = t * 0.9;
    mesh.rotation.y = t * 1.1;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
})();


