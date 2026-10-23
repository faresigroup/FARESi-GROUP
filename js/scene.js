/* FARESI GROUP — Three.js scene for the Services section: one 3D emblem per service */

function scene() {
  const c = $('#gl');
  if (RM || !window.THREE) return c.parentElement.remove();
  try {
    const R = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: !mob });
    R.setPixelRatio(Math.min(devicePixelRatio, mob ? 1.5 : 2));
    const S = new THREE.Scene(), C = new THREE.PerspectiveCamera(40, 1, .1, 50);
    C.position.z = 6.4;
    const seg = mob ? 24 : 48, geos = [];
    const mat = (color, metalness = .2, roughness = .4) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
    const M = { blue: mat(0x0756f7), light: mat(0x6f9bff), white: mat(0xf3f3f3, .1, .5) };
    const mesh = (geo, m, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
      geos.push(geo);
      const o = new THREE.Mesh(geo, m);
      o.position.set(x, y, z);
      o.rotation.set(rx, ry, rz);
      return o
    };
    const poly = (pts, depth) => {
      const sh = new THREE.Shape();
      pts.forEach((p, k) => k ? sh.lineTo(p[0], p[1]) : sh.moveTo(p[0], p[1]));
      sh.closePath();
      return new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: false })
    };
    const icon = (...parts) => {
      const g = new THREE.Group();
      g.add(...parts);
      g.scale.setScalar(.0001);
      g.visible = false;
      return g
    };
    const PI = Math.PI;
    const icons = [
      /* 0 · Marketing strategy: target with an arrow */
      icon(
        mesh(new THREE.TorusGeometry(1.3, .13, 16, seg), M.blue),
        mesh(new THREE.TorusGeometry(.85, .13, 16, seg), M.white),
        mesh(new THREE.TorusGeometry(.42, .13, 16, seg), M.blue),
        mesh(new THREE.SphereGeometry(.2, 20, 20), M.light),
        mesh(new THREE.CylinderGeometry(.05, .05, 1.9, 12), M.light, .95, .95, .25, 0, 0, -PI / 4),
        mesh(new THREE.ConeGeometry(.16, .4, 16), M.light, .12, .12, .25, 0, 0, 3 * PI / 4)
      ),
      /* 1 · Paid advertising: megaphone with sound waves */
      icon(
        mesh(new THREE.CylinderGeometry(.95, .35, 1.4, seg), M.blue, .1, .1, 0, 0, 0, -PI / 2),
        mesh(new THREE.CylinderGeometry(.42, .42, .5, seg), M.white, -.85, .1, 0, 0, 0, -PI / 2),
        mesh(new THREE.BoxGeometry(.28, .8, .28), M.light, -.45, -.7, 0, 0, 0, .35),
        mesh(new THREE.TorusGeometry(.5, .06, 10, seg, 1.1), M.light, 1.05, .1, 0, 0, 0, -.55),
        mesh(new THREE.TorusGeometry(.85, .06, 10, seg, 1.1), M.white, 1.05, .1, 0, 0, 0, -.55),
        mesh(new THREE.TorusGeometry(1.2, .06, 10, seg, 1.1), M.light, 1.05, .1, 0, 0, 0, -.55)
      ),
      /* 2 · Social media: speech bubble with dots and a heart-free tail */
      icon(
        (() => {
          const b = mesh(new THREE.SphereGeometry(1, seg, seg), M.blue, 0, .2, 0);
          b.scale.set(1.45, 1, .55);
          return b
        })(),
        mesh(new THREE.ConeGeometry(.38, .8, 3), M.blue, -.65, -.75, 0, 0, 0, PI + .5),
        mesh(new THREE.SphereGeometry(.14, 16, 16), M.white, -.5, .2, .56),
        mesh(new THREE.SphereGeometry(.14, 16, 16), M.white, 0, .2, .56),
        mesh(new THREE.SphereGeometry(.14, 16, 16), M.white, .5, .2, .56)
      ),
      /* 3 · Graphic design: circle, square and triangle */
      icon(
        mesh(new THREE.CylinderGeometry(.75, .75, .25, seg), M.blue, -.65, .55, 0, PI / 2),
        mesh(new THREE.BoxGeometry(1.3, 1.3, .25), M.white, .55, .4, .2, 0, 0, .3),
        mesh(poly([[-.8, 0], [.8, 0], [0, 1.35]], .25), M.light, 0, -1.05, .35)
      ),
      /* 4 · Video & reels: vertical phone with a play button */
      icon(
        mesh(new THREE.BoxGeometry(1.6, 2.6, .24), M.blue),
        mesh(new THREE.BoxGeometry(1.4, 2.4, .04), M.white, 0, 0, .13),
        mesh(poly([[-.28, -.42], [.5, 0], [-.28, .42]], .1), M.blue, 0, .15, .15),
        mesh(new THREE.BoxGeometry(.95, .07, .04), M.light, 0, -.9, .16)
      ),
      /* 5 · Creative campaigns: light bulb with rays */
      icon(
        mesh(new THREE.SphereGeometry(.85, seg, seg), M.light, 0, .3, 0),
        mesh(new THREE.CylinderGeometry(.42, .42, .55, seg), M.blue, 0, -.85, 0),
        mesh(new THREE.TorusGeometry(.42, .07, 10, seg), M.white, 0, -.7, 0, PI / 2),
        mesh(new THREE.TorusGeometry(.42, .07, 10, seg), M.white, 0, -1.0, 0, PI / 2),
        ...[0, 1, 2, 3, 4].map(k => {
          const a = PI * (.15 + k * .175);
          return mesh(new THREE.BoxGeometry(.09, .38, .09), M.blue, Math.cos(a) * 1.4, Math.sin(a) * 1.4 + .3, 0, 0, 0, a - PI / 2)
        })
      ),
      /* 6 · Front-end & UI/UX: browser window */
      icon(
        mesh(new THREE.BoxGeometry(2.5, 1.8, .18), M.white),
        mesh(new THREE.BoxGeometry(2.5, .38, .22), M.blue, 0, .71, .01),
        mesh(new THREE.SphereGeometry(.07, 12, 12), M.light, -1.05, .71, .13),
        mesh(new THREE.SphereGeometry(.07, 12, 12), M.light, -.85, .71, .13),
        mesh(new THREE.SphereGeometry(.07, 12, 12), M.light, -.65, .71, .13),
        mesh(new THREE.BoxGeometry(1.1, .13, .05), M.blue, -.55, .2, .1),
        mesh(new THREE.BoxGeometry(.75, .13, .05), M.light, -.72, -.08, .1),
        mesh(new THREE.BoxGeometry(1.3, .13, .05), M.blue, -.45, -.36, .1),
        mesh(poly([[0, 0], [.34, -.12], [.12, -.16], [.2, -.4], [.08, -.42], [0, -.2]].map(p => [p[0] * 1.3 + .55, p[1] * 1.3 + .05]), .06), M.light, 0, 0, .14)
      )
    ];
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.05, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: .14 }));
    const g = new THREE.Group();
    g.add(shell, ...icons);
    S.add(g, new THREE.AmbientLight(0xffffff, .8));
    const d = new THREE.DirectionalLight(0xffffff, 1.8);
    d.position.set(3, 4, 5);
    const p = new THREE.PointLight(0x6f9bff, 14, 20);
    p.position.set(-4, -2, 3);
    S.add(d, p);
    let ti = 0, mx = 0, my = 0, tr = 0;
    setActive = i => {
      ti = Math.min(i, icons.length - 1)
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
      tr += .012;
      g.rotation.y += (mx * 1.1 + Math.sin(tr) * .45 - g.rotation.y) * .05;
      g.rotation.x += (my * .6 - g.rotation.x) * .05;
      g.position.y = Math.sin(tr * 1.6) * .08;
      shell.rotation.y -= .002;
      icons.forEach((o, k) => {
        const s = o.scale.x + ((k === ti ? 1 : 0) - o.scale.x) * .12;
        o.scale.setScalar(Math.max(s, .0001));
        o.visible = s > .01
      });
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
      geos.forEach(x => x.dispose());
      Object.values(M).forEach(x => x.dispose());
      shell.geometry.dispose();
      shell.material.dispose();
      R.dispose()
    })
  } catch (e) {
    c.parentElement.remove()
  }
}
