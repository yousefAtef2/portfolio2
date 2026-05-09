import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const vertexShader = `
  attribute float charIndex;
  attribute float sideIndex;
  varying float vCharIndex;
  varying float vFogDepth;
  varying float vSideIndex;

  void main() {
    vCharIndex = charIndex;
    vSideIndex = sideIndex;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 12.0;
    gl_Position = projectionMatrix * mvPosition;
    vFogDepth = -mvPosition.z;
  }
`

const fragmentShader = `
  uniform sampler2D uTextures[26];
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vCharIndex;
  varying float vFogDepth;
  varying float vSideIndex;

  vec4 getTexture(int index) {
    if (index == 0) return uTextures[0];
    if (index == 1) return uTextures[1];
    if (index == 2) return uTextures[2];
    if (index == 3) return uTextures[3];
    if (index == 4) return uTextures[4];
    if (index == 5) return uTextures[5];
    if (index == 6) return uTextures[6];
    if (index == 7) return uTextures[7];
    if (index == 8) return uTextures[8];
    if (index == 9) return uTextures[9];
    if (index == 10) return uTextures[10];
    if (index == 11) return uTextures[11];
    if (index == 12) return uTextures[12];
    if (index == 13) return uTextures[13];
    if (index == 14) return uTextures[14];
    if (index == 15) return uTextures[15];
    if (index == 16) return uTextures[16];
    if (index == 17) return uTextures[17];
    if (index == 18) return uTextures[18];
    if (index == 19) return uTextures[19];
    if (index == 20) return uTextures[20];
    if (index == 21) return uTextures[21];
    if (index == 22) return uTextures[22];
    if (index == 23) return uTextures[23];
    if (index == 24) return uTextures[24];
    return uTextures[25];
  }

  void main() {
    int idx = int(vCharIndex);
    vec4 texColor = getTexture(idx);
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
    gl_FragColor = vec4(texColor.rgb, texColor.a);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, fogFactor);
  }
`

function createTextTexture(char: string, size = 64): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)
  ctx.font = `bold ${size * 0.8}px "Courier New", monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(char, size / 2, size / 2)
  return canvas
}

function generateAlphabetTextures(): HTMLCanvasElement[] {
  const textures: HTMLCanvasElement[] = []
  for (let i = 0; i < 26; i++) {
    textures.push(createTextTexture(String.fromCharCode(65 + i)))
  }
  return textures
}

function createHollowCubeGeometry() {
  const gridSize = 15
  const spacing = 12
  const shellThickness = 3
  const positions: number[] = []
  const charIndices: number[] = []
  const sideIndices: number[] = []

  const half = (gridSize * spacing) / 2

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        const px = x * spacing - half
        const py = y * spacing - half
        const pz = z * spacing - half

        const distX = Math.abs(px) - half
        const distY = Math.abs(py) - half
        const distZ = Math.abs(pz) - half

        let onSurface = false
        let sideIdx = -1

        if (Math.abs(distX) <= shellThickness) {
          onSurface = true
          sideIdx = px >= 0 ? 0 : 1
        } else if (Math.abs(distY) <= shellThickness) {
          onSurface = true
          sideIdx = py >= 0 ? 2 : 3
        } else if (Math.abs(distZ) <= shellThickness) {
          onSurface = true
          sideIdx = pz >= 0 ? 4 : 5
        }

        if (onSurface) {
          positions.push(px, py, pz)
          charIndices.push(Math.floor(Math.random() * 26))
          sideIndices.push(sideIdx)
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('charIndex', new THREE.Float32BufferAttribute(charIndices, 1))
  geometry.setAttribute('sideIndex', new THREE.Float32BufferAttribute(sideIndices, 1))

  return geometry
}

export default function ASCIIBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const pointsRef = useRef<THREE.Points | null>(null)
  const rafRef = useRef<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 100, 340)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 300)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Bloom post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.9,
      0.5,
      0
    )
    composer.addPass(bloomPass)
    composerRef.current = composer

    // Generate textures
    const canvasTextures = generateAlphabetTextures()
    const threeTextures = canvasTextures.map((c) => {
      const tex = new THREE.CanvasTexture(c)
      tex.needsUpdate = true
      return tex
    })

    // Create geometry
    const geometry = createHollowCubeGeometry()

    // Create material
    const uniforms = {
      uTextures: { value: threeTextures },
      uFogColor: { value: new THREE.Color(0x000000) },
      uFogNear: { value: 100.0 },
      uFogFar: { value: 340.0 },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)
    pointsRef.current = points

    // Animation
    let rotX = 0
    let rotY = 0
    let rotZ = 0
    const speedX = 0.003
    const speedY = 0.007
    const speedZ = 0.004

    function animate() {
      rotX += speedX
      rotY += speedY
      rotZ += speedZ
      points.rotation.x = rotX
      points.rotation.y = rotY
      points.rotation.z = rotZ
      composer.render()
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Character cycling
    intervalRef.current = setInterval(() => {
      const attr = points.geometry.attributes.charIndex
      const count = Math.floor(Math.random() * 15) + 5
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * attr.count)
        attr.setX(idx, Math.floor(Math.random() * 26))
      }
      attr.needsUpdate = true
    }, 100)

    // Resize handler
    function onResize() {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
      bloomPass.resolution.set(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      threeTextures.forEach((t) => t.dispose())
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
