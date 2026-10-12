/* FARESI GROUP — Three.js scene for the Services section */

function scene() {
  const c = $('#gl');
  if (RM || !window.THREE) return c.parentElement.remove();
  try {
    const R = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: !mob });
    R.setPixelRatio(Math.min(devicePixelRatio, mob ? 1.5 : 2));
    const S = new THREE.Scene(), C = new THREE.PerspectiveCamera(40, 1, .1, 50);
    C.position.z = 6.4;
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1, .3, mob ? 90 : 200, mob ? 12 : 24, 2, 3), new THREE.MeshStandardMaterial({ color: 0x0756f7, metalness: .7, roughness: .28 }));
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.95, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: .18 }));
    const g = new THREE.Group();
    g.add(knot, shell);
    S.add(g, new THREE.AmbientLight(0xffffff, .55));
    const d = new THREE.DirectionalLight(0xffffff, 2.2);
    d.position.set(3, 4, 5);
    const p = new THREE.PointLight(0x6f9bff, 40, 20);
    p.position.set(-4, -2, 3);
    S.add(d, p);
    const cols = [0x0756f7, 0x3b7bff, 0x1e6bff, 0x6f9bff, 0x0a3fc0, 0x4f8cff, 0x2a63e8].map(h => new THREE.Color(h));
    let ti = 0, mx = 0, my = 0, tr = 0;
    setActive = i => {
      ti = i
    };
    addEventListener('pointermove', e => {
      mx = e.clientX / innerWidth - .5;
      my = e.clientY / innerHeight - .5
    }, { passive: true });
    const size = () => {
      const w = c.clientWidth, h = c.clientHeight;
      R.setSize(w, h, false);
      C.aspect = w / h;
      C.updateProjectionMatrix()
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(c);
    let on = false, raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      tr += .0035;
      g.rotation.y += (mx * 1.2 + tr - g.rotation.y) * .05;
      g.rotation.x += (my * .8 - g.rotation.x) * .05;
      shell.rotation.y -= .002;
      knot.material.color.lerp(cols[ti], .06);
      g.scale.lerp(new THREE.Vector3().setScalar(.9 + ti * .04), .05);
      R.render(S, C)
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) {
        on = true;
        tick()
      } else if (!e.isIntersecting) {
        on = false;
        cancelAnimationFrame(raf)
      }
    });
    io.observe(c);
    addEventListener('pagehide', () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      knot.geometry.dispose();
      knot.material.dispose();
      shell.geometry.dispose();
      shell.material.dispose();
      R.dispose()
    })
  } catch (e) {
    c.parentElement.remove()
  }
}
