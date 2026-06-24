(function () {
  const THREE = window.THREE;
  const gsap = window.gsap;
  const registry = new Map();
  let refreshQueued = false;

  function hasWebGL() {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
    } catch (error) {
      return false;
    }
  }

  if (!THREE || !hasWebGL()) {
    document.body.classList.add("webgl-fallback");
    window.SDLCVisuals = { refresh: queueFallbackRefresh, disposeAll: function () {} };
    installFallbacks();
    window.addEventListener("hashchange", queueFallbackRefresh);
    return;
  }

  document.body.classList.add("webgl-ready");

  const colors = {
    cyan: 0x22d3ee,
    blue: 0x60a5fa,
    green: 0x34d399,
    violet: 0xa78bfa,
    amber: 0xfbbf24,
    rose: 0xfb7185,
    white: 0xeaf6ff
  };

  window.SDLCVisuals = {
    refresh: queueRefresh,
    disposeAll: disposeAll
  };

  queueRefresh();

  window.addEventListener("hashchange", queueRefresh);
  window.addEventListener("beforeunload", disposeAll);

  function queueRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => {
      refreshQueued = false;
      refreshScenes();
    });
  }

  function refreshScenes() {
    document.body.classList.add("webgl-ready");

    for (const [el, scene] of registry.entries()) {
      if (!document.body.contains(el)) {
        scene.dispose();
        registry.delete(el);
      }
    }

    document.querySelectorAll("[data-three-scene]").forEach((el) => {
      if (!registry.has(el)) {
        const scene = createScene(el);
        registry.set(el, scene);
        scene.start();
      }
    });
  }

  function disposeAll() {
    for (const scene of registry.values()) scene.dispose();
    registry.clear();
  }

  function installFallbacks() {
    document.body.classList.add("webgl-fallback");

    document.querySelectorAll("[data-three-scene]").forEach((el) => {
      if (!el.querySelector(".three-fallback-badge")) {
        el.innerHTML = '<div class="three-fallback-badge">WebGL fallback active</div>';
      }
    });
  }

  function queueFallbackRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => {
      refreshQueued = false;
      installFallbacks();
    });
  }

  function createScene(el) {
    el.innerHTML = "";
    el.classList.remove("scene-ready");

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "default" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 160);
    camera.position.set(0, 0, 9);

    const group = new THREE.Group();
    scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff, 0.82));

    const state = {
      el,
      scene,
      camera,
      renderer,
      group,
      nodes: [],
      packets: [],
      raf: 0,
      disposed: false,
      drag: false,
      lastX: 0,
      lastY: 0,
      pointer: new THREE.Vector2(3, 3),
      raycaster: new THREE.Raycaster(),
      hovered: null,
      ro: null,
      resizeCleanup: null,
      io: null,
      active: true
    };

    buildScene(el.dataset.threeScene, state);
    addHud(el, el.dataset.threeScene);
    wireInteractions(state);

    return {
      start() {
        resize(state);
        if (window.ResizeObserver) {
          state.ro = new ResizeObserver(() => resize(state));
          state.ro.observe(el);
        } else {
          const onResize = () => resize(state);
          window.addEventListener("resize", onResize);
          state.resizeCleanup = () => window.removeEventListener("resize", onResize);
        }
        if (window.IntersectionObserver) {
          state.io = new IntersectionObserver(
            (entries) => {
              state.active = entries[0]?.isIntersecting ?? true;
            },
            { rootMargin: "120px" }
          );
          state.io.observe(el);
        }
        el.classList.add("scene-ready");
        if (gsap) gsap.fromTo(state.group.scale, { x: 0.92, y: 0.92, z: 0.92 }, { x: 1, y: 1, z: 1, duration: 0.7, ease: "power3.out" });
        animate(state);
      },
      dispose() {
        state.disposed = true;
        cancelAnimationFrame(state.raf);
        state.ro?.disconnect();
        state.io?.disconnect();
        state.resizeCleanup?.();
        renderer.dispose();
        scene.traverse((object) => {
          object.geometry?.dispose?.();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
          else object.material?.dispose?.();
        });
        el.innerHTML = "";
      }
    };
  }

  function resize(state) {
    const rect = state.el.getBoundingClientRect();
    const width = Math.max(260, rect.width || 640);
    const height = Math.max(220, rect.height || 360);
    state.renderer.setSize(width, height, false);
    state.camera.aspect = width / height;
    state.camera.updateProjectionMatrix();
  }

  function animate(state) {
    if (state.disposed) return;
    if (!state.active) {
      state.raf = requestAnimationFrame(() => animate(state));
      return;
    }
    const time = performance.now() * 0.001;
    if (!state.drag) state.group.rotation.y += 0.001;

    state.packets.forEach((packet) => packet(time));
    state.nodes.forEach((node, index) => {
      const pulse = 1 + Math.sin(time * 2 + index) * 0.025;
      if (node !== state.hovered) node.scale.setScalar(pulse);
    });

    state.raycaster.setFromCamera(state.pointer, state.camera);
    const nextHover = state.raycaster.intersectObjects(state.nodes, false)[0]?.object || null;
    if (nextHover !== state.hovered) {
      if (state.hovered) scaleNode(state.hovered, 1);
      state.hovered = nextHover;
      if (state.hovered) scaleNode(state.hovered, 1.32);
      state.renderer.domElement.style.cursor = state.hovered?.userData?.href ? "pointer" : state.hovered ? "grab" : "default";
    }

    state.renderer.render(state.scene, state.camera);
    state.raf = requestAnimationFrame(() => animate(state));
  }

  function wireInteractions(state) {
    const canvas = state.renderer.domElement;
    canvas.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      state.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      state.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      if (state.drag) {
        state.group.rotation.y += (event.clientX - state.lastX) * 0.004;
        state.group.rotation.x += (event.clientY - state.lastY) * 0.0025;
        state.lastX = event.clientX;
        state.lastY = event.clientY;
      }
    });
    canvas.addEventListener("pointerdown", (event) => {
      state.drag = true;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      canvas.setPointerCapture?.(event.pointerId);
    });
    canvas.addEventListener("pointerup", (event) => {
      state.drag = false;
      canvas.releasePointerCapture?.(event.pointerId);
    });
    canvas.addEventListener("click", () => {
      if (state.hovered?.userData?.href) location.hash = state.hovered.userData.href;
    });
    canvas.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        state.camera.position.z = clamp(state.camera.position.z + event.deltaY * 0.006, 4.2, 18);
      },
      { passive: false }
    );
  }

  function buildScene(type, state) {
    const builders = {
      mission: buildMission,
      twin: buildTwin,
      agents: buildAgents,
      galaxy: buildGalaxy,
      impact: buildImpact,
      brain: buildBrain,
      topology: buildTopology
    };
    (builders[type] || buildGalaxy)(state);
  }

  function buildMission(state) {
    addCore(state, "Enterprise Platform", colors.white, 0.72);
    addRings(state, [1.8, 2.8, 3.8]);
    const nodes = [
      ["Teams", -3.7, 1.7, 0, colors.cyan, "#team-workspace"],
      ["Projects", 3.4, 1.25, -0.4, colors.violet, "#portfolio"],
      ["AI Agents", 0, 3.0, 0.2, colors.green, "#orchestration"],
      ["Admin", -2.7, -1.8, 0.4, colors.amber, "#platform-admin"],
      ["Traceability", 2.8, -1.75, 0.3, colors.rose, "#galaxy"]
    ];
    nodes.forEach((node) => addNode(state, node));
    connectCenter(state, nodes);
    addParticles(state, 90, 5.2);
  }

  function buildTwin(state) {
    const nodes = [
      ["Requirement", -4.1, 0, 0, colors.cyan, "#studio"],
      ["BRD", -2.65, 1.05, -0.2, colors.green, "#approvals"],
      ["PRD", -1.1, -0.2, 0.2, colors.violet, "#versions"],
      ["Stories", 0.65, 1.0, -0.2, colors.blue, "#delivery"],
      ["Architecture", 2.3, -0.2, 0.25, colors.amber, "#architect"],
      ["Code", 3.65, 1.0, -0.2, colors.cyan, "#integrations"],
      ["Tests", 4.0, -1.25, 0.15, colors.green, "#impact-engine"]
    ];
    nodes.forEach((node) => addNode(state, node));
    addPolyline(state, nodes, colors.cyan);
    addPackets(state, nodes, colors.green, 5);
  }

  function buildAgents(state) {
    addCore(state, "AI Router", colors.white, 0.5);
    const labels = ["Requirement", "BRD", "PRD", "Story", "Architecture", "Developer", "QA", "Security", "DevOps"];
    const nodes = labels.map((label, index) => {
      const angle = (index / labels.length) * Math.PI * 2;
      return [label, Math.cos(angle) * 3.35, Math.sin(angle) * 2.18, Math.sin(angle * 1.4) * 0.55, [colors.cyan, colors.violet, colors.green, colors.amber, colors.blue][index % 5], "#orchestration"];
    });
    nodes.forEach((node) => addNode(state, node));
    connectCenter(state, nodes);
    addPolyline(state, nodes, colors.violet, true);
    addPackets(state, nodes, colors.cyan, 9);
  }

  function buildGalaxy(state) {
    const nodes = [
      ["Requirement", -4.1, 0.2, 0.2, colors.violet, "#impact-engine"],
      ["Feature", -2.1, 1.35, -0.3, colors.cyan, "#galaxy"],
      ["Story", 0.1, -0.45, 0.45, colors.green, "#delivery"],
      ["Prompt", 2.25, 1.1, -0.2, colors.amber, "#orchestration"],
      ["Test", 4.2, -0.1, 0.25, colors.rose, "#delivery"],
      ["Audit", 1.6, -1.9, -0.3, colors.blue, "#enterprise-audit"]
    ];
    nodes.forEach((node) => addNode(state, node));
    addPolyline(state, nodes, colors.amber);
    addPackets(state, nodes, colors.amber, 7);
    addParticles(state, 120, 5.8);
  }

  function buildImpact(state) {
    const nodes = [
      ["V1", -3.8, 0, 0, colors.green, "#versions"],
      ["Impact Engine", 0, 0, 0.2, colors.amber, "#impact-engine"],
      ["V2", 3.8, 0, 0, colors.rose, "#versions"],
      ["BRD", -1.25, 1.65, -0.2, colors.cyan, "#approvals"],
      ["PRD", 1.25, 1.55, 0.2, colors.violet, "#versions"],
      ["Stories", -1.2, -1.6, 0.2, colors.green, "#delivery"],
      ["Tests", 1.35, -1.65, -0.3, colors.rose, "#impact-engine"]
    ];
    nodes.forEach((node) => addNode(state, node));
    addPolyline(state, nodes.slice(0, 3), colors.amber);
    connectCenter(state, nodes.slice(3), colors.rose);
    addPackets(state, nodes.slice(0, 3), colors.rose, 5);
  }

  function buildBrain(state) {
    const hubs = [
      ["Global KB", -2.7, 0.8, 0, colors.cyan, "#global-knowledge"],
      ["Team KB", 0, -0.8, 0.4, colors.violet, "#knowledge-hub"],
      ["Project KB", 2.7, 0.8, -0.2, colors.green, "#brain"]
    ];
    hubs.forEach((node) => addNode(state, node, 0.32));
    addPolyline(state, hubs, colors.cyan, true);
    for (let i = 0; i < 34; i += 1) {
      const a = i * 0.79;
      const r = 1.15 + (i % 5) * 0.34;
      addNode(state, ["", Math.cos(a) * r, Math.sin(a) * r * 0.72, (Math.random() - 0.5) * 1.2, [colors.cyan, colors.green, colors.violet][i % 3], "#global-knowledge"], 0.07);
    }
  }

  function buildTopology(state) {
    addCore(state, "Control Tower", colors.white, 0.58);
    const nodes = [
      ["Northstar", -3.5, 1.35, 0, colors.cyan, "#tenants"],
      ["Cedar", -3.5, -1.3, 0.2, colors.violet, "#tenants"],
      ["Helio", 0, 2.15, -0.25, colors.amber, "#tenants"],
      ["MetroGrid", 3.5, 1.2, 0.2, colors.green, "#tenants"],
      ["Mariner", 3.5, -1.4, -0.2, colors.blue, "#tenants"]
    ];
    nodes.forEach((node) => addNode(state, node, 0.28));
    connectCenter(state, nodes);
    addPackets(state, [["Northstar", -3.5, 1.35, 0], ["Control", 0, 0, 0], ["Mariner", 3.5, -1.4, -0.2]], colors.green, 4);
    addParticles(state, 65, 5);
  }

  function addNode(state, [label, x, y, z, color, href], size = 0.22) {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(size, 24, 14),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.96 })
    );
    node.position.set(x, y, z);
    node.userData = { label, href };
    state.group.add(node);
    state.nodes.push(node);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(size * 2.2, 18, 10),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.075, depthWrite: false })
    );
    halo.position.copy(node.position);
    state.group.add(halo);
    return node;
  }

  function addCore(state, label, color, size) {
    const node = addNode(state, [label, 0, 0, 0, color, null], size);
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(size * 1.8, 28, 14),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.06, depthWrite: false })
    );
    state.group.add(glow);
    return node;
  }

  function addRings(state, radii) {
    radii.forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.008, 8, 96),
        new THREE.MeshBasicMaterial({ color: [colors.cyan, colors.violet, colors.green][index % 3], transparent: true, opacity: 0.24 })
      );
      ring.rotation.x = Math.PI / 2.6 + index * 0.28;
      ring.rotation.y = index * 0.34;
      state.group.add(ring);
    });
  }

  function addPolyline(state, nodes, color, loop) {
    const pts = nodes.map((node) => node.slice(1, 4));
    const values = [];
    for (let i = 0; i < pts.length - 1; i += 1) values.push(...pts[i], ...pts[i + 1]);
    if (loop && pts.length > 2) values.push(...pts[pts.length - 1], ...pts[0]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(values, 3));
    state.group.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.36 })));
  }

  function connectCenter(state, nodes, color = colors.cyan) {
    const values = [];
    nodes.forEach((node) => values.push(0, 0, 0, node[1], node[2], node[3]));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(values, 3));
    state.group.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 })));
  }

  function addPackets(state, nodes, color, count) {
    const pts = nodes.map((node) => node.slice(1, 4));
    for (let i = 0; i < count; i += 1) {
      const packet = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 8),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
      );
      state.group.add(packet);
      state.packets.push((time) => {
        const progress = (time * 0.42 + i * 0.29) % Math.max(1, pts.length - 1);
        const idx = Math.min(pts.length - 2, Math.floor(progress));
        const t = progress - idx;
        const a = pts[idx];
        const b = pts[idx + 1];
        packet.position.set(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t));
      });
    }
  }

  function addParticles(state, count, radius) {
    const values = [];
    for (let i = 0; i < count; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      values.push(Math.cos(a) * r, Math.sin(a) * r * 0.62, (Math.random() - 0.5) * 2.4);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(values, 3));
    state.group.add(new THREE.Points(geometry, new THREE.PointsMaterial({ color: colors.cyan, size: 0.026, transparent: true, opacity: 0.36 })));
  }

  function addHud(el, type) {
    const labels = {
      mission: "Project Universe / drag rotate / wheel zoom",
      twin: "3D Digital Twin / flowing dependencies",
      agents: "Agent mesh / token packets",
      galaxy: "Traceability Galaxy / impact beams",
      impact: "Impact propagation / animated heat path",
      brain: "Knowledge neurons / semantic retrieval",
      topology: "Enterprise topology / platform activity"
    };
    const hud = document.createElement("div");
    hud.className = "three-hud";
    hud.innerHTML = `<span class="live-pill"><i></i> WebGL stable</span><strong>${labels[type] || "Three.js scene"}</strong>`;
    el.appendChild(hud);
    if (gsap) gsap.fromTo(hud, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }

  function scaleNode(node, value) {
    if (gsap) gsap.to(node.scale, { x: value, y: value, z: value, duration: 0.16, ease: "power2.out" });
    else node.scale.setScalar(value);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
})();
